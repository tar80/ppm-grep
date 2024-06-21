/* @file Output the result of the grep command
 * @arg 0 {string} - Specify the name of grep command
 * @arg 1 {string} - Specify the name of output command
 * @arg 2 {string} - Specify the PPc usage ID
 * @arg 3 {number} - Specify the target path when unmarked. 0:cursor entry | 1:parent directory
 */

import '@ppmdev/polyfills/json.ts';
import type {Error_String} from '@ppmdev/modules/types.ts';
import {uniqID, tmp} from '@ppmdev/modules/data.ts';
import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import {pathSelf} from '@ppmdev/modules/path.ts';
import {writeLines} from '@ppmdev/modules/io.ts';
import {ppm} from '@ppmdev/modules/ppm.ts';
import {expandSource} from '@ppmdev/modules/source.ts';
import {langDoGrep} from './mod/language.ts';
import {safeArgs} from '@ppmdev/modules/argument.ts';
import {GREP, doGrep as core} from './mod/core.ts';

const {scriptName} = pathSelf();
const lang = langDoGrep[ppm.lang()];
const temp = tmp();
const commitHashText = `${temp.dir}\\ppmgrepcommithash.txt`;

const main = (): void => {
  const [cmd, output, id, targetSpec] = safeArgs('grep', 'lf', 'w', 0);
  const dirtype = PPx.DirectoryType;
  const {pwd, vtype, metaSource} = core.getParent(dirtype);
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

  PPx.Execute(`*delete ${commitHashText}`);
  createButton();
  const [error, word] = doSearch(grepCmd, outputCmd, metaSource.commit || '');

  if (error) {
    PPx.Quit(1);
  }

  const entry = hasMark ? '%#FCB' : targetSpec === 0 ? PPx.Extract('"%R"') : '';
  grepCmd = PPx.getIValue(GREP.cmd).toLowerCase();
  outputCmd = PPx.getIValue(GREP.output).toLowerCase();
  const [keyword, searchTerm] = core.correctWord(word, grepCmd);
  const filepath = outputPath(keyword.replace(/["':/\\\|\s\.]/g, '_'), outputCmd);
  const commit = grepCmd === 'gitgrep' ? PPx.getIValue(GREP.commitHash) : '';

  if (!isEmptyStr(commit)) {
    metaSource.commit = commit;
  }

  if (outputCmd !== 'ppv') {
    PPx.Execute(
      `%Osq *run -noppb -hide -d:"${pwd}" %si"${GREP.cmd}" %si"${GREP.option}" "%(${searchTerm}%)" ${commit} ${entry}>${filepath}`
    );
    setVariableI('', '', '', '');

    if (outputCmd === 'lf') {
      const [ok, data] = core.createResult({dirtype, pwd, keyword, path: filepath, metaSource});

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
    `*string i,${GREP.button}=%(*string i,${GREP.option}=` +
      `%*input("%si'${GREP.option}'"` +
      ` -title:"%si'${GREP.cmd}' option (fixed: %se'${GREP.optFixed}')"` +
      ` -mode:e` +
      ` -select:%se'${GREP.optFlen}',%se'${GREP.optAlen}'` +
      ` -k *completelist -set -detail:"user 2user1"` +
      ` -file:"%sgu'ppmcache'\\complist\\%se'${GREP.complist}'")` +
      `%:*setcaption [%si'${GREP.output}'] %si'${GREP.cmd}' %si'${GREP.option}'` +
      `%)`
  );
};

const setVariableI = (cmd: string, opts: string, output: string, commit: string): void => {
  PPx.Execute(
    `*string i,${GREP.cmd}=${cmd}` +
      `%:*string i,${GREP.option}=${opts}` +
      `%:*string i,${GREP.output}=${output}` +
      `%:*string i,${GREP.commitHash}=${commit}`
  );
};

const setTempKeys = (): void => {
  const pwd = expandSource('ppm-grep')?.path;
  const switchKey = ppm.user(GREP.switchKey);
  const commitKey = ppm.user(GREP.commitKey);
  !isEmptyStr(switchKey) &&
    !!pwd &&
    ppm.setkey(switchKey, `*script "${pwd}\\dist\\switchGrep.js",${ppm.user(GREP.switchType)}`);
  !isEmptyStr(commitKey) &&
    ppm.setkey(
      commitKey,
      [
        `*string o,path=${commitHashText}`,
        `%(*ifmatch "o:e,a:d-","%so'path'"%:*goto start%)`,
        `%(%Obd git log --date=short --format="%OD%%h %;%%ad *%%s%%d%OD-" -50>"%so'path'"%&%)`,
        `%(%mstart *string o,hash=%*input("%si'${GREP.commitHash}'" -title:"${lang.selectCommit}" -mode:e -k *completelist -file:"%so'path'")%)`,
        `%(*setcaption [%*regexp("%si'${GREP.output}'","tr/a-z/A-Z")] %si'${GREP.cmd}' %si'${GREP.option}'  (commit: %so'hash')%)`
      ].join('%bn%bt'),
      true
    );
};

const doSearch = (cmdGrep: string, cmdOutput: string, commit: string): Error_String => {
  type Parameter = {cmd: string; output: string; listname: string; fixed: string; added: string};
  const param: Parameter = JSON.parse(ppm.getcust(`${GREP.muneId}:${cmdGrep}${cmdOutput}`)[1]);
  const sep = param.added.indexOf('-') === 0 ? ' ' : '';
  setVariableI(cmdGrep, `${param.fixed}${sep}${param.added}`, cmdOutput, commit);
  const setVariableE =
    `*string e,${GREP.optFixed}=${param.fixed}` +
    `%:*string e,${GREP.optAdded}=${param.added}` +
    `%:*string e,${GREP.complist}=${param.listname}` +
    `%:*string e,${GREP.optFlen}=${param.fixed.length}` +
    `%:*string e,${GREP.optAlen}=%*js("PPx.result=PPx.Extract('%si\'${GREP.option}\'').length;")`;
  setTempKeys();
  const [exitcode, word] = ppm.getinput({
    title: `[${cmdOutput.toUpperCase()}] ${cmdGrep} ${param.fixed}${sep}${param.added}`,
    mode: 'Os',
    k: `%(*mapkey use,K_ppmTemp%:${setVariableE}%)`
  });
  PPx.Execute(`*string i,${GREP.button}=`);
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
    const userID = `${uniqID.lfDset}C${o.id}`;
    const labelId = `${userID},KC_main`;
    PPx.Execute(
      `*linecust ${labelId}:CLOSEEVENT,` +
        `%%:*deletecust _User:${userID}` +
        `%%:*mapkey delete,${GREP.keyId}` +
        `%%:*linecust ${labelId}:LOADEVENT,` +
        `%%:*linecust ${labelId}:CLOSEEVENT,`
    );
  },
  ppv(o: Options) {
    PPx.Execute(
      '*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod)' + '%%:*linecust tmod,KV_main:CLOSEEVENT,'
    );
    PPx.Execute('*setcust XV_tmod=1');
    PPx.Execute(
      `*cd "${o.pwd}"%:%Obd %si"${GREP.cmd}" %si"${GREP.option}" "%(${o.searchTerm}%)" ${o.commit} ${o.entry}` +
        `|%0ppvw -bootid:${o.id} -esc -document -utf8 -k *string p,grep=1%%:*find "${o.keyword}"`
    );
    setVariableI('', '', '', '');
  },
  edit(o: Options) {
    type Matches = '${pwd}' | '${filepath}' | '${keyword}';
    const rgx = /\$\{pwd\}|\$\{filepath\}|\$\{keyword\}/gm;
    const replacer = (match: string) =>
      ({'${pwd}': o.pwd, '${filepath}': o.filepath, '${keyword}': o.keyword})[match as Matches];
    const cmdline = PPx.Extract('%*getcust(S_ppm#user:grep_edit)');
    PPx.Execute(`%OP *execute ,%(%OP- ${cmdline.replace(rgx, replacer)}%)`);
  }
};

main();
