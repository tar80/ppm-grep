//!*script
/**
 * Toggle grep commands
 *
 * @arg 0 type. 0:toggle | 1:list
 */

var type = PPx.Arguments.Length ? PPx.Arguments.Item(0) | 0 : 0;
var cmd = PPx.Extract('%si"cmd"%si"output');
var data = (function () {
  var result = [];
  var data = PPx.Extract('%*getcust(M_ppmGrep)');
  var codes = ['\r\n', '\n', '\r'];

  for (var i = 0, l = 3; i < l; i++) {
    linefeed = codes[i];
    if (~data.indexOf(linefeed)) {
      break;
    }
  }

  result = data.split(linefeed);
  return {prop: result, len: result.length - 2 }
})();

var next = (function (prop, len) {
  var param = {
    0: function () {
      var reg = /^\S+\t=\s?(.+)/;
      var cmd_ = ~cmd.indexOf('git grep') ? 'gitgrep' : cmd;

      for (var i = 1, l = len; i < l; i++) {
        if (~prop[i].indexOf(cmd_)) {
          break;
        }
      }

      var nextProp = prop[(i + 1 === len) ? 1 : i + 1];
      return nextProp.replace(reg, '$1');
    },
    1: function () { return PPx.Extract('%M_ppmGrep') || PPx.Quit(-1); }
  }[type];

  var p = param().split(',');

  return {
    cmd: p[0],
    output: p[1],
    lock: p[2],
    add: p[3],
    list: p[4]
  }
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
PPx.Execute('*setcaption [' + next.output + '] ' + next.cmd + ' ' + gopt + ' ※\\=\\\\');
