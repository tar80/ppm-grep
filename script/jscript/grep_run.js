﻿//!*script
/**
 * Output result of Grep
 *
 * @arg 0 Output file path
 * @arg 1 Start command of Grep
 * @arg 2 Start command of output
 * @arg 3 Specify non-mark entry target path. 0:cursor entry | 1:parent directory
 */

var NL_CHAR = '\r\n';

/* Initial */
// Read module
var st = PPx.CreateObject('ADODB.stream');
var module = function (filepath) {
  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(filepath);
  var data = st.ReadText(-1);
  st.Close;

  return Function(' return ' + data)();
};

// Load module
var util = module(PPx.Extract('%*getcust(S_ppm#global:module)\\util.js'));
var git = module(PPx.Extract('%*getcust(S_ppm#global:module)\\gitm.js'));
var output = module(PPx.Extract('%*getcust(S_ppm#global:cache)\\script\\grep_output.js'));
module = null;

var g_args = (function (args) {
  var len = args.length;

  if (len < 3) {
    util.error('arg');
  }

  return {
    length: len,
    listfile: args.Item(0),
    cmd: args.Item(1),
    output: args.Item(2),
    target: len > 3 ? args.Item(3) | 0 : 0
  };
})(PPx.Arguments);

// Get parent directory information
var g_path = (function (args) {
  var dirType = PPx.DirectoryType;
  var vwd = PPx.Extract('%FDV');

  /* When wd indecates aux:path */
  var wd = PPx.Extract('%FD');
  var virtual = false;

  if (~vwd.indexOf('aux:')) {
    virtual = 'aux';

    if (args.cmd === 'gitgrep') {
      wd = PPx.Extract('%si"repoRoot"') || git.root(wd);
    } else {
      wd = util.auxlocalpath(wd);
    }
  } else if (dirType === 4) {
    virtual = 'lf';

    wd = util.basepath(vwd) || PPx.Extract('%*name(D,"%FDC")');
  }

  if (wd === '') {
    util.quitMsg('Unsupported directory');
  }

  /* Target path of Grep command */
  var path = {0: PPx.Extract('%R'), 1: ''}[args.target];
  var hash;

  if (PPx.EntryMarkCount !== 0) {
    path = '%#FCB';

    if (virtual === 'aux') {
      if (~vwd.indexOf('S_git-log')) {
        path = '';
        hash = '%*name(C,%#FC)';
      } else {
        hash = '%si"commithash"';
      }

      PPx.Execute('*string i,git_string=' + hash);
    }
  } else if (virtual === 'aux') {
    !PPx.Execute('%"ppm-grep"%Q"Execute ' + args.cmd + ' for ' + wd + '"') || PPx.Quit(-1);
  }

  return {
    wd: wd,
    entry: path,
    type: dirType
  };
})(g_args);

// Set the option button
PPx.Execute(
  '*string i,Edit_OptionCmd=%(*string i,gopt=%*input("%si"gopt""' +
    ' -title:"Option  ※Fixed value: %se"lock" " -mode:e -select:%se"flen",%se"blen"' +
    ' -k *completelist -set -detail:"user 2user1" -file:"%\'list\'\\%se"list"") %:' +
    ' *setcaption [%si"output"] %si"cmd" %si"gopt"  ※\\=\\\\%)'
);

// Search strings input and escape processing
var g_search = (function (args) {
  var param = util.getc('M_ppmGrep:' + args.cmd + args.output).split(',');
  var option = param[2] + (param[3].indexOf('-') === 0 ? ' ' : '') + param[3];
  var si = [
    '*string i,cmd=' + args.cmd,
    '*string i,gopt=' + option,
    '*string i,output=' + args.output,
    '*linecust grep,KC_main:SELECTEVENT,' +
      '%(*string i,cmd=%:*string i,gopt=%:*string i,output=%:' +
      '*string i,git_string=%:*string i,Edit_OptionCmd=%:' +
      '*linecust grep,KC_main:SELECTEVENT,%)',
    '%K"@LOADCUST"'
  ].join('%:');
  var se = [
    '*string e,lock=' + param[2],
    '*string e,add=' + param[3],
    '*string e,list=' + param[4],
    '*string e,flen=' + param[2].length,
    '*string e,blen=%*js("PPx.Result=PPx.Extract(\'%si"gopt"\').length")'
  ].join('%:');

  PPx.Execute(si);

  // Get search terms
  var terms =
    PPx.Extract(
      util.input.call({
        type: 1,
        title: '[' + args.output + '] ' + args.cmd + ' ' + option + ' ※\\=\\\\',
        mode: 'Os',
        k: '%(*mapkey use,K_ppmGrep %: *linemessage %si"git_string" %:' + se + '%)'
      })
    ) || PPx.Quit(1);

  // Convert regular expression escape characters in search terms to characters
  var words = terms.replace(/\^?([^$]*)\$?/, '$1');

  return {
    terms: PPx.Extract('%si"cmd"') === 'grep' ? terms.replace(/\\/g, '\\\\') : terms,
    words: words.replace(/(\\)(.)/g, function (p0, p1, p2) {
      return util.metaRegexp.nor[p0] || util.metaRegexp.nor[p1] + p2;
    })
  };
})(g_args);

output['ppv'] = function (args, path, term, keyword) {
  // Changed to Caret-mode at one time
  PPx.Execute(
    '*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod) %%:' +
      ' *linecust tmod,KV_main:CLOSEEVENT,'
  );
  PPx.Execute('*setcust XV_tmod=1');

  // Receive the result of Grep with PPv standard-input
  PPx.Execute(
    '%Od *run -min -noppb -d:"' +
      path.wd +
      '"' +
      ' %si"cmd" %si"gopt" "' +
      term +
      '" %si"git_string" ' +
      path.entry +
      ' | %0ppvw -bootid:w -esc -document -utf8 -k *string p,grep=1 %%: *find "' +
      keyword +
      '"'
  );
};

output['lf'] = function (args, path, term, keyword) {
  var commithash = PPx.Extract('%si"git_string');
  var hasCommit = !!commithash;
  var commithash_ = hasCommit ? commithash + '@@@' : '';

  // List header
  var newList = [
    ';ListFile',
    ';Base=' + path.wd + '|' + path.type,
    '"file","line",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"result => ' + commithash_ + keyword + '"'
  ];

  // Output of Grep result
  PPx.Execute(
    '%Od *run -min -noppb -d:"' +
      path.wd +
      '"' +
      ' %si"cmd" %si"gopt" "' +
      term +
      '" ' +
      commithash +
      ' ' +
      path.entry +
      ' > "' +
      args.listfile +
      '" %&'
  );

  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(args.listfile);

  // Shaping the results of Grep
  var grepResults = st.ReadText(-1).split('\n');
  var replacer = {
    'false': function (num) {
      grepResults[num].replace(
        /^(.*?)[-:](\d*)([-:])\s*(.*)/,
        function (_match, p1, p2, p3, p4) {
          p1 = p1 === '' ? p3 : p1;
          p3 = ~p3.indexOf(':') ? 0 : 3;
          p4 = p4.replace(/"/g, '""');
          newList.push(
            '"' + p1 + '","' + p2 + '",A:H' + p3 + ',C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"' + p4 + '"'
          );
        }
      );
    },
    'true': function (num) {
      grepResults[num].replace(
        /^([0-9a-zA-Z]{7}):(.*?)[-:](\d*)([-:])\s*(.*)/,
        function (_p0, p1, p2, p3, p4, p5) {
          p2 = p1 === '' ? p4 : p2;
          p4 = ~p4.indexOf(':') ? 0 : 3;
          p5 = p5.replace(/"/g, '""');
          newList.push(
            '"' + p2 + '","' + p3 + '",A:H' + p4 + ',C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"' + p5 + '"'
          );
        }
      );
    }
  }[hasCommit];

  for (var i = 0, l = grepResults.length; i < l; i++) {
    replacer(i);
  }

  // Write the results
  st.Position = 0;
  st.WriteText(newList.join(NEWLINE));
  st.SaveToFile(args.listfile, 2);
  st.Close;
};

output[PPx.Extract('%si"output"').toLowerCase()](g_args, g_path, g_search.terms, g_search.words);
