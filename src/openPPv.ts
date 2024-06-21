/* @file Send path to PPv
 * @arg 0 {string} - Specify the PPv id
 */

import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import fso from '@ppmdev/modules/filesystem.ts';
import {safeArgs} from '@ppmdev/modules/argument.ts';

const UNIQ_ID = 'ppmgrep';

const main = () => {
  const [ppvid] = safeArgs('W');
  const started = PPx.Extract(`%NV${ppvid}`);

  if (!isEmptyStr(started)) {
    PPx.Execute(`*closeppx V${ppvid}`);

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
    `*topmostwindow V${ppvid},1`,
    `*find "${keyword}"`,
    '*jumpline %*name(SC,"%FSC")',
    `*selectppx ${ppcid}`
  ];
  PPx.Execute(`*ppv -bootid:${ppvid} %*comment() -k ${startOptions.join('%%:')}`);

  // const selectEvent1 = [`*string o,line=%*name(SC,"%FSC")`, `*if ("${ppcid}"!="%n")||("%so'line'"=="-")`, '*stop'];
  // const selectEvent2 = [
  //   `*string o,newpath=%*comment()`,
  //   `*string o,refname=%*extract(V${ppvid},"%%*name(C,""%%FC"")")`,
  //   `*if ("%so'newpath'"!="%so'refname'")`,
  //   `%Oa *ppv -r "%so'newpath'" -k *jumpline %so'line'`,
  //   `*stop`
  // ];
  // const selectEvent3 = `*execute V${ppvid},*jumpline %%so'line'`;
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

main();
