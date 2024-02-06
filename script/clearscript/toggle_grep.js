//!*script
/**
 * Toggle grep commands
 *
 * @arg 0 type. 0:toggle | 1:list
 */

const type = PPx.Arguments.Length ? PPx.Arguments.Item(0) | 0 : 0;
const cmd = PPx.Extract('%si"cmd"%si"output');
const data = (() => {
  const commands = PPx.Extract('%*getcust(M_ppmGrep)');
  const codes = ['\r\n', '\n', '\r'];
  let linefeed;

  for (let i = 0, l = 3; i < l; i++) {
    linefeed = codes[i];
    if (~commands.indexOf(linefeed)) {
      break;
    }
  }

  const result = commands.split(linefeed);
  return {prop: result, len: result.length - 2};
})();

const next = ((prop, len) => {
  const param = {
    0: () => {
      const reg = /^\S+\t=\s?(.+)/;
      const cmd_ = ~cmd.indexOf('git grep') ? 'gitgrep' : cmd;
      let i = 1;

      for (; i < len; i++) {
        if (~prop[i].indexOf(cmd_)) {
          break;
        }
      }

      const nextProp = prop[i + 1 === len ? 1 : i + 1];
      return nextProp.replace(reg, '$1');
    },
    1: () => PPx.Extract('%M_ppmGrep') || PPx.Quit(-1)
  }[type];

  const p = param().split(',');

  return {
    cmd: p[0],
    output: p[1],
    lock: p[2],
    add: p[3],
    list: p[4]
  };
})(data.prop, data.len);

const gopt = `${next.lock}${next.add.indexOf('-') === 0 ? ' ' : ''}${next.add}`;
const cmdline = [
  `*string i,cmd=${next.cmd}`,
  `*string i,output=${next.output}`,
  `*string i,gopt=${gopt}`,
  `*string e,lock=${next.lock}`,
  `*string e,add=${next.add}`,
  `*string e,list=${next.list}`,
  `*string e,flen=${next.lock.length}`,
  `*string e,blen=${next.lock.length + next.add.length}`
].join('%:');

PPx.Execute(cmdline);
PPx.Execute(`*setcaption [${next.output}] ${next.cmd} ${gopt} ※\\=\\\\`);
