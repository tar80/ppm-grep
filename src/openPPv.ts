/* @file Send path to PPv
 * @arg 0 {string} - Specify the PPv id
 */

import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import fso from '@ppmdev/modules/filesystem.ts';

const UNIQ_ID = 'ppmgrep';

const main = () => {
  const args = adjustArgs();
  const started = PPx.Extract(`%NV${args.id}`);

  if (!isEmptyStr(started)) {
    PPx.Execute(`*closeppx V${args.id}`);

    return;
  }

  const ppcid = PPx.Extract('%n');
  const keyword = PPx.Extract('%*name(X,"%FDV")');
  const lnum = PPx.Extract('%*getcust(XV_lnum)');
  const tmod = PPx.Extract('%*getcust(XV_tmod)');
  PPx.Execute('*setcust XV_lnum=1');
  PPx.Execute('*setcust XV_tmod=1');
  const path = PPx.Entry.Comment;

  if (!fso.FileExists(path)) {
    return;
  }

  const startOptions = [
    `*topmostwindow V${args.id},1`,
    `*find "${keyword}"`,
    '*jumpline %*name(SC,"%FSC")',
    `*selectppx ${ppcid}`
  ];
  PPx.Execute(`*ppv -bootid:${args.id} %*comment() -k ${startOptions.join('%%:')}`);

  // const selectEvent1 = [`*string o,line=%*name(SC,"%FSC")`, `*if ("${ppcid}"!="%n")||("%so'line'"=="-")`, '*stop'];
  // const selectEvent2 = [
  //   `*string o,newpath=%*comment()`,
  //   `*string o,refname=%*extract(V${args.id},"%%*name(C,""%%FC"")")`,
  //   `*if ("%so'newpath'"!="%so'refname'")`,
  //   `%Oa *ppv -r "%so'newpath'" -k *jumpline %so'line'`,
  //   `*stop`
  // ];
  // const selectEvent3 = `*execute V${args.id},*jumpline %%so'line'`;
  // PPx.Execute(`*linecust ${UNIQ_ID}1,KC_main:SELECTEVENT,%(${selectEvent1.join('%:')}%)`);
  // PPx.Execute(`*linecust ${UNIQ_ID}2,KC_main:SELECTEVENT,%(${selectEvent2.join('%:')}%)`);
  // PPx.Execute(`*linecust ${UNIQ_ID}3,KC_main:SELECTEVENT,${selectEvent3}`);

  const closeEvent = [
    `*if ("${ppcid}"=="%*extract(C,%%n)")`,
    `*setcust XV_lnum=${lnum}`,
    `*setcust XV_tmod=${tmod}`,
    `*linecust ${UNIQ_ID},KV_main:CLOSEEVENT,`
    // `*linecust ${UNIQ_ID}1,KC_main:SELECTEVENT,`,
    // `*linecust ${UNIQ_ID}2,KC_main:SELECTEVENT,`,
    // `*linecust ${UNIQ_ID}3,KC_main:SELECTEVENT,`
  ];
  PPx.Execute(`*linecust ${UNIQ_ID},KV_main:CLOSEEVENT,%(${closeEvent.join('%:')}%)`);
};

const adjustArgs = (args = PPx.Arguments) => {
  const arr: string[] = ['W'];

  for (let i = 0, k = args.length; i < k; i++) {
    arr[i] = args.Item(i);
  }

  return {id: arr[0]};
};

main();
