import '@ppmdev/polyfills/stringPadStart.ts';
// import {} from '@ppmdev/modules/filesystem.ts';
// import {} from '@ppmdev/modules/git.ts';
import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import {readLines} from '@ppmdev/modules/io.ts';
import {rgxEscape} from '@ppmdev/modules/meta.ts';
import {type LfMetadata, createLfItems, createLfMeta, getLfMeta} from '@ppmdev/parsers/listfile.ts';

type VirtualType = 'aux' | 'lf';

export const GREP = {
  BUTTON: 'Edit_OptionCmd',
  CMD: 'grepCmd',
  OUTPUT: 'grepOutput',
  OPTION: 'grepOption',
  COMPLIST: 'grepComplist',
  OPT_FIXED: 'fixed',
  OPT_ADDED: 'added',
  OPT_FLEN: 'flen',
  OPT_ALEN: 'alen',
  MENU_ID: 'M_ppmGrep',
  KEY_ID: 'K_ppmGrep',
  SWITCH_KEY: 'grep_switchkey',
  SWITCH_TYPE: 'grep_switchtype',
  COMMIT_KEY: 'grep_commitkey',
  COMMIT_HASH: 'commitHash'
};

const getParent = (dirtype: number, pwd: string = PPx.Extract('%FD'), vwd: string = PPx.Extract('%FDV')) => {
  let vtype: VirtualType | undefined;
  let metaSource: LfMetadata = {};

  if (dirtype === 4) {
    vtype = 'lf';
    const [error, data] = readLines({path: vwd, enc: 'utf16le'});

    if (!error) {
      metaSource = getLfMeta(data.lines);
      pwd = metaSource.base ? metaSource.base : '';
    } else {
      pwd = '';
    }
  } else if (~vwd.indexOf('aux:')) {
    vtype = 'aux';
    pwd = vwd.replace(/^aux:(\/\/)?[MS]_[^\\/]+[\\/](.*)/, '$2');
  }

  return {pwd, vtype, metaSource};
};

const correctWord = (word: string, cmd: string): string[] => {
  word = word.replace(/^\^|\$$/g, '');
  const keyword = word.replace(/(\\.)/g, (match, chars) => rgxEscape.exclude[match as keyof (typeof rgxEscape)['exclude']] || chars);
  const searchTerm = cmd === 'grep' ? word.replace(/\\/g, '\\\\') : word;

  return [keyword, searchTerm];
};

const createResult = ({
  dirtype,
  pwd,
  keyword,
  path
}: {
  dirtype: number;
  pwd: string;
  keyword: string;
  path: string;
  metaSource?: LfMetadata;
}): [boolean, string[]] => {
  const metaCmd = `;cmd=*viewstyle -temp format "${PPx.Extract('%*getcust(S_ppm#user:grep_viewstyle)')}"`;
  const metaResult = createLfMeta({
    basepath: pwd,
    dirtype,
    opts: [`;Search=${keyword}`, metaCmd, ';ppm=grep', `;mapkey=${GREP.KEY_ID}`, ';freq=every']
  });
  const [error, data] = readLines({path, enc: 'utf8', linefeed: '\n'});

  if (error) {
    return [false, []];
  }

  const rgx = /^([0-9a-zA-Z]{7,8}:)?(.*?)[-:](\d*)([-:])\s*(.*)/;
  const rep = (_: string, _1: string, m2: string, m3: string, m4: string, m5: string) => {
    const name = isEmptyStr(m2) ? m4 : m2;
    const att = ~m4.indexOf(':') ? 0 : 3;
    const comment = m5.replace(/"/g, '""');

    return `{"name":"${name}","sname":"${m3.padStart(5,' ')}","att":"${att}","comment":"${comment}"}`;
  };
  const lfLines = createLfItems({lines: data.lines, rgx, rep, virtualEntry: true});

  return [true, [...metaResult, ...lfLines]];
};

export const doGrep = {getParent, correctWord, createResult};
