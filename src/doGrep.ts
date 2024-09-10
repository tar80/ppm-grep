/* @file Output the result of the grep command
 * @arg 0 {string} - Specify the name of grep command
 * @arg 1 {string} - Specify the name of output command
 * @arg 2 {string} - Specify the PPc usage ID
 * @arg 3 {number} - Specify the target path when unmarked. 0:cursor entry | 1:parent directory
 */

import '@ppmdev/polyfills/json.ts';
import {safeArgs} from '@ppmdev/modules/argument.ts';
import {tmp, uniqID} from '@ppmdev/modules/data.ts';
import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import {writeLines} from '@ppmdev/modules/io.ts';
import {pathSelf} from '@ppmdev/modules/path.ts';
import {ppm} from '@ppmdev/modules/ppm.ts';
import {expandSource} from '@ppmdev/modules/source.ts';
import type {Error_String} from '@ppmdev/modules/types.ts';
import {GREP, doGrep as core} from './mod/core.ts';
import {langDoGrep} from './mod/language.ts';

const {scriptName} = pathSelf();
const lang = langDoGrep[ppm.lang()];
const temp = tmp();
const COMMIT_HASH_LIST = `${temp.dir}\\ppmgrepcommithash.txt`;
const EVENT_LABEL = uniqID.virtualEntry;

const main = (): void => {
  const [cmd, output, id, targetSpec] = safeArgs('grep', 'lf', 'w', 0);
  const dirType = PPx.DirectoryType;
  const {pwd, vtype, metaSource} = core.getParent(dirType);
  let grepCmd = cmd.toLowerCase();
  let outputCmd = output.toLowerCase();

  if (isEmptyStr(pwd)) {
    ppm.echo(scriptName, lang.invalidPath);
    PPx.Quit(1);
  }

  const hasMark = PPx.EntryMarkCount !== 0;

  if (hasMark && vtype === 'aux') {
    !ppm.question(scriptName, lang.warning(grepCmd, pwd)) && PPx.Quit(1);
  }

  PPx.Execute(`*delete ${COMMIT_HASH_LIST}`);
  createButton();
  const [error, word] = doSearch(grepCmd, outputCmd, metaSource.commit || '');

  if (error) {
    PPx.Quit(1);
  }

  const entry = hasMark ? '%#FCB' : targetSpec === 0 ? PPx.Extract('"%R"') : '';
  grepCmd = PPx.getIValue(GREP.CMD).toLowerCase();
  outputCmd = PPx.getIValue(GREP.OUTPUT).toLowerCase();
  const [keyword, searchTerm] = core.correctWord(word, grepCmd);
  const filepath = outputPath(keyword.replace(/["':/\\\|\s\.]/g, '_'), outputCmd);
  const commit = grepCmd === 'gitgrep' ? PPx.getIValue(GREP.COMMIT_HASH) : '';

  if (!isEmptyStr(commit)) {
    metaSource.commit = commit;
  }

  if (outputCmd !== 'ppv') {
    PPx.Execute(
      `%Osq *run -noppb -hide -d:"${pwd}" %si"${GREP.CMD}" %si"${GREP.OPTION}" "%(${searchTerm}%)" ${commit} ${entry}>${filepath}`
    );
    setVariableI('', '', '', '');

    if (outputCmd === 'lf') {
      const [ok, data] = core.createResult({dirtype: dirType, pwd, keyword, path: filepath, metaSource});

      if (!ok) {
        ppm.linemessage('.', lang.noResult, true);
        PPx.Quit(1);
      }

      writeLines({path: filepath, data, enc: 'utf16le', overwrite: true, linefeed: '\r\n'});
    }
  }

  showResult[outputCmd as OutputCmd]({filepath, pwd, entry, id, keyword, searchTerm, commit});
};

const outputPath = (name: string, cmd: string) => {
  let ext = cmd === 'edit' ? 'ppmgrep_e' : 'ppmgrep';

  return `${temp.dir}${name}.${ext}`;
};

const createButton = (): void => {
  PPx.Execute(
    `*string i,${GREP.BUTTON}=%(*string i,${GREP.OPTION}=` +
      `%*input("%si'${GREP.OPTION}'"` +
      ` -title:"%si'${GREP.CMD}' option (fixed: %se'${GREP.OPT_FIXED}')"` +
      ' -mode:e' +
      ` -select:%se'${GREP.OPT_FLEN}',%se'${GREP.OPT_ALEN}'` +
      ` -k *completelist -set -detail:"user 2user1"` +
      ` -file:"%sgu'ppmcache'\\complist\\%se'${GREP.COMPLIST}'")` +
      `%:*setcaption [%si'${GREP.OUTPUT}'] %si'${GREP.CMD}' %si'${GREP.OPTION}'` +
      '%)'
  );
};

const setVariableI = (cmd: string, opts: string, output: string, commit: string): void => {
  PPx.Execute(
    `*string i,${GREP.CMD}=${cmd}` +
      `%:*string i,${GREP.OPTION}=${opts}` +
      `%:*string i,${GREP.OUTPUT}=${output}` +
      `%:*string i,${GREP.COMMIT_HASH}=${commit}`
  );
};

const setTempKeys = (): void => {
  const pwd = expandSource('ppm-grep')?.path;
  const switchKey = ppm.user(GREP.SWITCH_KEY);
  const commitKey = ppm.user(GREP.COMMIT_KEY);
  !isEmptyStr(switchKey) && !!pwd && ppm.setkey(switchKey, `*script "${pwd}\\dist\\switchGrep.js",${ppm.user(GREP.SWITCH_TYPE)}`);
  !isEmptyStr(commitKey) &&
    ppm.setkey(
      commitKey,
      [
        `*string o,path=${COMMIT_HASH_LIST}`,
        `%(*ifmatch "o:e,a:d-","%so'path'"%:*goto start%)`,
        `%(%Obd git log --date=short --format="%OD%%h %;%%ad *%%s%%d%OD-" -50>"%so'path'"%&%)`,
        `%(%mstart *string o,hash=%*input("%si'${GREP.COMMIT_HASH}'" -title:"${lang.selectCommit}" -mode:e -k *completelist -file:"%so'path'")%)`,
        `%(*setcaption [%*regexp("%si'${GREP.OUTPUT}'","tr/a-z/A-Z")] %si'${GREP.CMD}' %si'${GREP.OPTION}'  (commit: %so'hash')%)`
      ].join('%bn%bt'),
      true
    );
};

const doSearch = (cmdGrep: string, cmdOutput: string, commit: string): Error_String => {
  type Parameter = {cmd: string; output: string; listname: string; fixed: string; added: string};
  const param: Parameter = JSON.parse(ppm.getcust(`${GREP.MENU_ID}:${cmdGrep}${cmdOutput}`)[1]);
  const sep = param.added.indexOf('-') === 0 ? ' ' : '';
  setVariableI(cmdGrep, `${param.fixed}${sep}${param.added}`, cmdOutput, commit);
  const setVariableE =
    `*string e,${GREP.OPT_FIXED}=${param.fixed}` +
    `%:*string e,${GREP.OPT_ADDED}=${param.added}` +
    `%:*string e,${GREP.COMPLIST}=${param.listname}` +
    `%:*string e,${GREP.OPT_FLEN}=${param.fixed.length}` +
    `%:*string e,${GREP.OPT_ALEN}=%*js("PPx.result=PPx.Extract('%si\'${GREP.OPTION}\'').length;")`;
  setTempKeys();
  const [exitcode, word] = ppm.getinput({
    title: `[${cmdOutput.toUpperCase()}] ${cmdGrep} ${param.fixed}${sep}${param.added}`,
    mode: 'Os',
    k: `%(*mapkey use,${uniqID.tempKey}%:${setVariableE}%)`
  });
  PPx.Execute(`*string i,${GREP.BUTTON}=`);
  ppm.deletekeys();

  if (exitcode > 0) {
    setVariableI('', '', '', '');

    return [true, ''];
  }

  return [false, word];
};

type OutputCmd = keyof typeof showResult;
type Options = {
  filepath: string;
  pwd: string;
  entry: string;
  id: string;
  keyword: string;
  searchTerm: string;
  commit: string;
};
const showResult = {
  lf(o: Options) {
    PPx.Execute(`*ppc -r -single -mps -bootid:${o.id} ${o.filepath}`);
    const userID = `${EVENT_LABEL}C${o.id}`;
    const labelId = `${userID},KC_main`;
    PPx.Execute(`*linecust ${labelId}:CLOSEEVENT,*linecust ${labelId}:LOADEVENT,%%:*linecust ${labelId}:CLOSEEVENT,`);
  },
  ppv(o: Options) {
    PPx.Execute('*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod)%%:*linecust tmod,KV_main:CLOSEEVENT,');
    PPx.Execute('*setcust XV_tmod=1');
    PPx.Execute(
      `*cd "${o.pwd}"%:%Obd %si"${GREP.CMD}" %si"${GREP.OPTION}" "%(${o.searchTerm}%)" ${o.commit} ${o.entry}` +
        `|%0ppvw -bootid:${o.id} -esc -document -utf8 -k *string p,grep=1%%:*find "${o.keyword}"`
    );
    setVariableI('', '', '', '');
  },
  edit(o: Options) {
    type Matches = '${pwd}' | '${filepath}' | '${keyword}';
    const rgx = /\$\{pwd\}|\$\{filepath\}|\$\{keyword\}/gm;
    const replacer = (match: string) => ({'${pwd}': o.pwd, '${filepath}': o.filepath, '${keyword}': o.keyword})[match as Matches];
    const cmdline = PPx.Extract('%*getcust(S_ppm#user:grep_edit)');
    PPx.Execute(`%OP *execute ,%(%OP- ${cmdline.replace(rgx, replacer)}%)`);
  }
};

main();
