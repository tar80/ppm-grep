(function () {
  return {
    vim: function (args, path, term, _keyword) {
      var listfilepath = args.listfile + 'vim';
      var editor = PPx.Extract("%g'gvim'") !== '' ? 'gvim' : 'vim';
      PPx.Execute(
        '*run -noppb -hide -d:"' +
          path.wd +
          '"' +
          '%si"cmd" %si"gopt" "%(' +
          term +
          '%)" %si"git_string"' +
          path.entry +
          '>"' +
          listfilepath +
          '" %& *string i,git_string='
      );
      // NOTE:Adjust the window with Winpos and Lines Columns. Because %Ox option could not maximize
      PPx.Execute(
        '%Obd ' +
          editor +
          ' "+winpos 0 0|set lines=40 columns=130|tc ' +
          path.wd +
          '|cfile ' +
          listfilepath +
          '|copen|set nowrap|silent! /' +
          term +
          '/"'
      );
    },
    nvim: function (args, path, term, _keyword) {
      var listfilepath = args.listfile + 'vim';
      PPx.Execute(
        '*run -noppb -hide -d:"' +
          path.wd +
          '"' +
          '%si"cmd" %si"gopt" "%(' +
          term +
          '%)" %si"git_string"' +
          path.entry +
          '>"' +
          listfilepath +
          '" %& *string i,git_string='
      );
      var proc = PPx.Extract(
        '%*script(%*getcust(S_ppm#global:ppm)\\lib\\vbs\\see_process.vbs,nvim.exe,6000,"wt -w 1 -p Neovim",3)'
      );
      PPx.Execute(
        "*script %'scr'%\\launch_neovim.js," +
          proc +
          ',100,command,"tc ' +
          path.wd +
          '|cfile ' +
          listfilepath +
          '|copen|set nowrap|silent! /' +
          term +
          '/"'
      );
      PPx.Execute('*focus #%*findwindowclass(cascadia_hosting_window_class)');
    }
  };
})();
/**
 * Method to process grep output
 * NOTE: The method name must be lowercase.
 *
 * @param {string} args.length PPx.Arguments.length
 * @param {string} args.listfile Grep-output listfile path
 * @param {string} args.cmd Execute grep-command
 * @param {string} args.output Output
 * @param {number} args.target 0:cursor entry, 1:parent directory
 * @param {string} path.wd Working directory
 * @param {string} path.entry Target of grep entries
 * @param {string} path.type Working directory-type
 * @param {string} term String to grep
 * @param {string} keyword String without regular-expression-meta from the term
 */
