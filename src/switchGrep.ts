/* @file Grep command switcher
 * @arg 0 {number} - Switch mode. "0"(toggle) | "1"(menu)
 */

import '@ppmdev/polyfills/json.ts';
import {info} from '@ppmdev/modules/data.ts';
import {safeArgs} from '@ppmdev/modules/argument.ts';
import {GREP} from './mod/core.ts';

const main = (): void => {
  const [isMenu] = safeArgs(false);
  const prop = nextProp(isMenu);
  const next = JSON.parse(prop.replace(/^[A-Z]+\s*=\s*/, '')) as GrepDetail;
  const cmdline = switchGrep(next);

  PPx.Execute(cmdline);
  PPx.Execute(`*setcaption [${next.output}] ${next.cmd} ${next.option}`);
};

type ItemKeys = 'cmd' | 'output' | 'listname' | 'fixed' | 'added' | 'option';
type GrepDetail = {[key in ItemKeys]: string};

const nextProp = (isMenu: boolean) => {
  if (!!isMenu) {
    return PPx.Extract(`%k"down"%:%${GREP.muneId}`) || PPx.Quit(1);
  }

  let cmdName = PPx.Extract(`%si'${GREP.cmd}'%si'${GREP.output}'`).toUpperCase();
  cmdName = cmdName.replace(' ', '');
  const props = PPx.Extract(`%*getcust(${GREP.muneId})`).split(info.nlcode);
  const len = props.length - 3;
  let i = 1;

  for (; i < len; i++) {
    if (~props[i].indexOf(cmdName)) {
      break;
    }
  }

  return props[i === len ? 1 : ++i];
};

const switchGrep = (item: GrepDetail) => {
  const sep = item.added.indexOf('-') === 0 ? ' ' : '';
  item['option'] = `${item.fixed}${sep}${item.added}`;

  return (
    `*string i,${GREP.cmd}=${item.cmd}%:` +
    `*string i,${GREP.output}=${item.output}%:` +
    `*string i,${GREP.option}=${item.option}%:` +
    `*string e,${GREP.complist}=${item.listname}%:` +
    `*string e,${GREP.optFixed}=${item.fixed}%:` +
    `*string e,${GREP.optAdded}=${item.added}%:` +
    `*string e,${GREP.optFlen}=${item.fixed.length}%:` +
    `*string e,${GREP.optAlen}=${item.fixed.length + sep.length + item.added.length}`
  );
};

main();
