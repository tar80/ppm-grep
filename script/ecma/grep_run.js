//!*script
/**
 * Output result of Grep
 *
 * @arg {string} 0 Output file path
 * @arg {string} 1 Start command of Grep
 * @arg {string} 2 Start command of output
 * @arg {number} 3 Specify non-mark entry target path. 0:cursor entry | 1:parent directory
 */

'use strict';

const NL_CHAR = '\r\n';

/* Initial */
// Read module
const st = PPx.CreateObject('ADODB.stream');
let module = function (filepath) {
  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(filepath);
  const data = st.ReadText(-1);
  st.Close;

  return Function(' return ' + data)();
};

// Load module
const util = module(PPx.Extract('%*getcust(S_ppm#global:module)\\util.js'));
const input = module(PPx.Extract('%*getcust(S_ppm#global:module)\\input.js'));
const git = module(PPx.Extract('%*getcust(S_ppm#global:module)\\gitm.js'));
const output = module(PPx.Extract('%*getcust(S_ppm#global:cache)\\script\\grep_output.js'));
module = null;

const g_args = (args = PPx.Arguments) => {
  const arr = ['%*temp(result.xgrep', 'grep', 'LF', '0'];
  const len = args.length;

  if (len < 1) {
    util.error('arg');
  }

  for (let i = 0; i < len; i++) {
    arr[i] = args.Item(i);
  }

  return {
    length: len,
    listfile: PPx.Extract(arr[0]),
    cmd: arr[1],
    output: arr[2],
    targetspec: arr[3] | 0
  };
};

// Get working directory information
const directory_info = (g = grep_info) => {
  const dirType = PPx.DirectoryType;
  const vwd = PPx.Extract('%FDV');
  let pwd = PPx.Extract('%FD');
  let virtual = false;

  /* When pwd indecates aux:path */
  if (~vwd.indexOf('aux:')) {
    virtual = 'aux';

    if (g.cmd === 'gitgrep') {
      pwd = gm_root || git.root(pwd);
    } else {
      pwd = util.auxlocalpath(pwd);
    }
  } else if (dirType === 4) {
    virtual = 'lf';

    pwd = util.basepath(vwd) || PPx.Extract('%*name(D,"%FDC")');
  }

  if (pwd === '') {
    util.quitMsg('Unsupported directory');
  }

  /* Target path of Grep command */
  let path = {0: PPx.Extract('%R'), 1: ''}[g.targetspec];
  let hash;

  if (PPx.EntryMarkCount !== 0) {
    path = '%#FCB';

    if (virtual === 'aux') {
      if (~vwd.indexOf('S_gm-')) {
        path = '';
        hash = '%si"gmHead"';
      } else {
        hash = 'head';
      }

      PPx.setIValue('gm_string', hash);
    }
  } else if (virtual === 'aux') {
    !util.interactive('ppm-grep', `Execute ${g.cmd} to ${pwd}`) || PPx.Quit(-1);
    // !PPx.Execute(`%"ppm-grep"%Q"Execute ${g.cmd} for ${pwd}"`) || PPx.Quit(-1);
  }

  return {
    wd: pwd,
    entry: path,
    type: dirType
  };
};

// Search strings input and escape processing
const search_string = (g = grep_info) => {
  const param = util.getc('M_ppmGrep:' + g.cmd + g.output).split(',');

  if (param.length > 5) {
    for (let i = 5; i < param.length; i++) {
      param[4] = param[4] + ',' + param[i];
    }
  }

  const option = param[3] + (param[4].indexOf('-') === 0 ? ' ' : '') + param[4];

  const si = [
    `*string i,cmd=${g.cmd}`,
    `*string i,gopt=${option}`,
    `*string i,output=${g.output}`,
    '*linecust ppmgrep,KC_main:SELECTEVENT,' +
      '%(*string i,cmd=%:*string i,gopt=%:*string i,output=' +
      '%:*string i,gm_string=%:*string i,Edit_OptionCmd=' +
      '%:*linecust ppmgrep,KC_main:SELECTEVENT,%)',
    '%K"@LOADCUST"'
  ].join('%:');
  const se = [
    `*string e,lock=${param[3]}`,
    `*string e,add=${param[4]}`,
    `*string e,list=${param[2]}`,
    `*string e,flen=${param[3].length}`,
    '*string e,blen=%*js("PPx.Result=PPx.Extract(""\'%si"gopt"\'"").length")'
  ].join('%:');

  PPx.Execute(si);

  const commitlist = PPx.Extract('%*temp()%\\ppm_gmcommithash.txt');
  input.addkey(
    "^\\'@'",
    `*ifmatch "o:e,a:d-","${commitlist}"` +
      `%%:*string i,gm_string=%%*input("" -title:"Select commit" -mode:e -k *completelist -file:"${commitlist}")` +
      '%%:*linemessage %%si"gm_string"%%:*stop%bn' +
      '%bt*linemessage Commit-list not found',
    'Select commit'
  );

  // Get search terms
  const terms = input.lied.call({
    esc: 1,
    title: `RegExp [${g.output}] ${g.cmd} ${option}`,
    mode: 'Os',
    k: `%(*mapkey use,K_ppmGrep %: *linemessage %si"gm_string" %:${se}%)`
  });

  // Convert regular expression escape characters in search terms to characters
  const words = terms.replace(/\^?([^$]*)\$?/, '$1');

  return {
    terms: PPx.Extract('%si"cmd"') === 'grep' ? terms.replace(/\\/g, '\\\\') : terms,
    words: words.replace(/(\\)(.)/g, (p0, p1, p2) => p0.metaRegexp('norm') || p1 + p2)
  };
};

output['ppv'] = (_args, path, term, keyword) => {
  // Changed to Caret-mode at one time
  PPx.Execute(
    '*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod)' +
      '%%:*linecust tmod,KV_main:CLOSEEVENT,'
  );
  PPx.Execute('*setcust XV_tmod=1');

  // Receive the result of Grep with PPv standard-input
  PPx.Execute(
    `%Od *run -min -noppb -d:"${path.wd}" %si"cmd" %si"gopt" "%(${term}%)" %si"gm_string" ${path.entry}` +
      `|%0ppvw -bootid:w -esc -document -utf8 -k *string p,grep=1%%:*find "${keyword}"`
  );
};

output['lf'] = (args, path, term, keyword) => {
  const commithash = PPx.getIValue('gm_string');
  const hasCommit = !!commithash;
  const commithash_ = hasCommit ? commithash + '@@@' : '';

  // List header
  const newList = [
    ';ListFile',
    `;Base=${path.wd}|${path.type}`,
    `"file","line",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"term=${commithash_}${keyword}"`
  ];

  // Output of Grep result
  PPx.Execute(
    `%Od *run -min -noppb -d:"${path.wd}" %si"cmd" %si"gopt" "%(${term}%)" ${commithash} ${path.entry}` +
      `>"${args.listfile}" %&`
  );

  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(args.listfile);

  // Shaping the results of Grep
  const grepResults = st.ReadText(-1).split('\n');
  const replacer = {
    'false': (num) => {
      grepResults[num].replace(/^(.*?)[-:](\d*)([-:])\s*(.*)/, (_p0, p1, p2, p3, p4) => {
        p1 = p1 === '' ? p3 : p1;
        p3 = ~p3.indexOf(':') ? 0 : 3;
        p4 = p4.replace(/"/g, '""');
        newList.push(`"${p1}","${p2}",A:H${p3},C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"${p4}"`);
      });
    },
    'true': (num) => {
      grepResults[num].replace(
        /^([0-9a-zA-Z]{7}):(.*?)[-:](\d*)([-:])\s*(.*)/,
        (_p0, p1, p2, p3, p4, p5) => {
          p2 = p1 === '' ? p4 : p2;
          p4 = ~p4.indexOf(':') ? 0 : 3;
          p5 = p5.replace(/"/g, '""');
          newList.push(`"${p2}","${p3}",A:H${p4},C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"${p5}"`);
        }
      );
    }
  }[hasCommit];

  for (let i = 0, l = grepResults.length; i < l; i++) {
    replacer(i);
  }

  // Write the results
  st.Position = 0;
  st.WriteText(newList.join(NL_CHAR));
  st.SaveToFile(args.listfile, 2);
  st.Close;
};

const grep_info = g_args();
const gm_root = PPx.getIvalue('gmRoot');
const wd_info = directory_info();

// Set the option button
PPx.Execute(
  '*string i,Edit_OptionCmd=%(*string i,gopt=%*input("%si"gopt""' +
    ' -title:"Option  [Fixed value: %se"lock"] " -mode:e -select:%se"flen",%se"blen"' +
    ' -k *completelist -set -detail:"user 2user1" -file:"%\'list\'\\%se"list"")' +
    '%:*setcaption RegExp [%si"output"] %si"cmd" %si"gopt"%)'
);

const search_info = search_string();

output[PPx.Extract('%si"output"').toLowerCase()](
  grep_info,
  wd_info,
  search_info.terms,
  search_info.words
);
