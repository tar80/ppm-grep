/* @file Grep command switcher
 * @arg 0 {number} - Switch mode. "0"(toggle) | "1"(menu)
 */

import '@ppmdev/polyfills/json.ts';
import {info} from '@ppmdev/modules/data.ts';
import {GREP} from './mod/core.ts';

const main = (): void => {
  const isMenu = PPx.Arguments.length > 0 && PPx.Arguments.Item(0) === '1';
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
    return PPx.Extract(`%k"down"%:%${GREP.MENU_ID}`) || PPx.Quit(1);
  }

  let cmdName = PPx.Extract(`%si'${GREP.CMD}'%si'${GREP.OUTPUT}'`).toUpperCase();
  cmdName = cmdName.replace(' ', '');
  const props = PPx.Extract(`%*getcust(${GREP.MENU_ID})`).split(info.nlcode);
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
    `*string i,${GREP.CMD}=${item.cmd}%:` +
    `*string i,${GREP.OUTPUT}=${item.output}%:` +
    `*string i,${GREP.OPTION}=${item.option}%:` +
    `*string e,${GREP.COMPLIST}=${item.listname}%:` +
    `*string e,${GREP.OPT_F}=${item.fixed}%:` +
    `*string e,${GREP.OPT_A}=${item.added}%:` +
    `*string e,${GREP.OPT_FLENGTH}=${item.fixed.length}%:` +
    `*string e,${GREP.OPT_ALENGTH}=${item.fixed.length + sep.length + item.added.length}`
  );
};

main();
