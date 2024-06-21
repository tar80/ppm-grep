export const langDoGrep = {
  en: {
    invalidPath: 'Invalid path',
    noResult: 'No results found',
    selectCommit: 'Select the tharget commit',
    warning: (cmd: string, path: string) => `Execute ${cmd} on ${path}`
  },
  ja: {
    invalidPath: '無効なパスです',
    noResult: '該当なし',
    selectCommit: '対象とするコミットを選択してください',
    warning: (cmd: string, path: string) => `${path} を対象に ${cmd} を実行します`
  }
};
