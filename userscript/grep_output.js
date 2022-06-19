(function () {
  return {
    vim: function (args, path, term, keyword) {
      var listfilepath = args.listfile + 'vim';
      var editor = PPx.Extract("%g'gvim'") !== '' ? 'gvim' : 'vim';
      PPx.Execute(
        '*run -noppb -hide -d:"' +
          path.wd +
          '"' +
          '%si"cmd" %si"gopt" "' +
          term +
          '" %si"git_string"' +
          path.entry +
          '>"' +
          listfilepath +
          '" %& *string i,git_string='
      );
      // NOTE:Adjust the window with Winpos and Lines Columns. Because %Ox option could not maximize
      PPx.Execute(
        '%Obd ' +
          editor +
          ' "+winpos 0 0|set lines=40 columns=130|cfile ' +
          listfilepath +
          '|copen|set nowrap|/' +
          term +
          '/"'
      );
    }
  };
})();
/**
 * Method to process grep output
 * NOTE: The method name must be lowercase.
 *
 * @param args.length {string} PPx.Arguments.length
 * @param args.listfile {string} Grep-output listfile path
 * @param args.cmd {string} Execute grep-command
 * @param args.output {string} Output
 * @param args.target {number} 0:cursor entry, 1:parent directory
 * @param path.wd {string} Working directory
 * @param path.entry {string} Target of grep entries
 * @param path.type {string} Working directory-type
 * @param term {string} String to grep
 * @param keyword {string} String without regular-expression-meta from the term
 */
