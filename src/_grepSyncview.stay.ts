/* @file Supports SyncView for virtual entries
 * @arg 0 {string} - Specify a PPv id
 * @arg 1 {number} - If 1 is specified, PPv closes when SyncView ends
 * @arg 2 {string} - Displays debug messages when "DEBUG" is specified
 */

import {safeArgs} from '@ppmdev/modules/argument.ts';
import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import {waitMoment} from '@ppmdev/modules/util.ts';
import debug from '@ppmdev/modules/debug.ts';

const STAYMODE_ID = 80100;
const EVENT_LABEL = 'ppm_grepsyncview';

type Cache = {ppvid: string; close: boolean; debug: boolean; lnum: string; tmod: string};
const cache = {} as Cache;

const main = (): void => {
  const [ppvid, closeppv, debugMode] = safeArgs('W', 0, '0');
  cache.ppvid = ppvid;
  cache.close = closeppv === 1;
  cache.debug = debugMode === 'DEBUG';
  cache.lnum = PPx.Extract('%*getcust(XV_lnum)');
  cache.tmod = PPx.Extract('%*getcust(XV_tmod)');

  cache.debug && debugMsg('start');

  startPPv();
  PPx.StayMode = STAYMODE_ID;
  ppx_Syncview();
};

const ppx_Syncview = (): void => {
  if (isEmptyStr(PPx.Extract(`%NV${cache.ppvid}`))) {
    ppx_resume();

    return;
  }

  const row = PPx.Extract(`%*name(SC,"%FSC")`);

  if (row === '-') {
    return;
  }

  const path = PPx.Extract(`%*name(DC,"%*comment")`);

  if (path !== PPx.Extract(`%*extract(V${cache.ppvid},"%%FDC")`)) {
    PPx.Execute(`*execute V${cache.ppvid},%%J"${path}"`);
    waitMoment(() => PPx.Extract(`%*extract(V${cache.ppvid},"%%FDC")`) !== path);
  }

  PPx.Execute(`*execute V${cache.ppvid},*jumpline ${row}`);
};

const ppx_resume = () => {
  PPx.StayMode = 0;
  PPx.SyncView = 0;
  PPx.Execute(`${selectevent('')}%:${activeevent('')}`);
  PPx.Execute(`*setcust XV_lnum=${cache.lnum}%:*setcust XV_tmod=${cache.tmod}`);
  cache.close && PPx.Execute(`*closeppx V${cache.ppvid}`);
  cache.debug && debugMsg('discard');
};

const startPPv = () => {
  const keyword = PPx.Extract('%*name(X,"%FDV")');
  PPx.Execute('*setcust XV_lnum=1%:*setcust XV_tmod=1');
  PPx.Execute(`%Oa *ppv -bootid:${cache.ppvid} -k *topmostwindow %%N,1%%:*find "${keyword}"%%:*focus %n`);
  waitMoment(() => isEmptyStr(PPx.Extract(`%NV${cache.ppvid}`)));
  PPx.Execute(selectevent(`*if ("%n"=="%%n")%%:*script ":${STAYMODE_ID},ppx_Syncview"`));
  PPx.Execute(activeevent(`*if ("%%N%n"=="")%%:${selectevent('')}%%:${activeevent('')}`));
};

const selectevent = (cmdline: string): string => `*linecust ${EVENT_LABEL},KC_main:SELECTEVENT,${cmdline}`;
const activeevent = (cmdline: string): string => `*linecust ${EVENT_LABEL},KC_main:ACTIVEEVENT,${cmdline}`;
const debugMsg = (msg: string): void => PPx.linemessage(`[DEBUG] lfSyncView ${msg}`);

main();
