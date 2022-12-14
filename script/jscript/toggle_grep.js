//!*script
/**
 * Toggle grep commands
 *
 * @arg 0 type. 0:toggle | 1:list
 */

var select_type = PPx.Arguments.Length ? PPx.Arguments.Item(0) | 0 : 0;
var cmd = PPx.Extract('%si"cmd"%si"output');
var data = (function () {
  var commands = PPx.Extract('%*getcust(M_ppmGrep)');
  var codes = ['\r\n', '\n', '\r'];
  var linefeed;

  for (var i = 0, l = 3; i < l; i++) {
    linefeed = codes[i];
    if (~commands.indexOf(linefeed)) {
      break;
    }
  }

  var result = commands.split(linefeed);
  return {prop: result, len: result.length - 2};
})();

var next = (function (prop, len) {
  var param = {
    0: function () {
      var reg = /^\S+\t=\s?(.+)/;
      var cmd_ = ~cmd.indexOf('git grep') ? 'gitgrep' : cmd;
      var i = 1;

      for (; i < len; i++) {
        if (~prop[i].indexOf(cmd_)) {
          break;
        }
      }

      var nextProp = prop[i + 1 === len ? 1 : i + 1];
      return nextProp.replace(reg, '$1');
    },
    1: function () {
      return PPx.Extract('%M_ppmGrep') || PPx.Quit(-1);
    }
  }[select_type];

  var p = param().split(',');

  if (typeof p[4] === 'undefined') {
    p[4] = '';
  } else if (p.length > 5) {
    for (var i = 5; i < p.length; i++) {
      p[4] = p[4] + ',' + p[i];
    }
  }

  return {
    cmd: p[0],
    output: p[1],
    list: p[2],
    lock: p[3],
    add: p[4]
  };
})(data.prop, data.len);

var gopt = next.lock + (next.add.indexOf('-') === 0 ? ' ' : '') + next.add;
var cmdline = [
  '*string i,cmd=' + next.cmd,
  '*string i,output=' + next.output,
  '*string i,gopt=' + gopt,
  '*string e,lock=' + next.lock,
  '*string e,add=' + next.add,
  '*string e,list=' + next.list,
  '*string e,flen=' + next.lock.length,
  '*string e,blen=' + (next.lock.length + next.add.length)
].join('%:');

PPx.Execute(cmdline);
PPx.Execute('*setcaption [' + next.output + '] ' + next.cmd + ' ' + gopt);
