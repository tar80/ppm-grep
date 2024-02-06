import PPx from '@ppmdev/modules/ppx';
global.PPx = Object.create(PPx);
import {doGrep as core} from '../core';

jest.mock('@ppmdev/modules/io');

describe('getParent()', function () {
  it('could not read listfile', () => {
    const obj = {pwd: '', metaSource: undefined, vtype: 'lf'};
    expect(core.getParent(4)).toEqual(obj);
  });
  it('on test.xlf', () => {
    const pwd = `${process.cwd()}\\src\\mod\\__tests__`;
    const vwd = `${pwd}\\test.xlf`;
    const obj = {pwd, metaSource: {base: pwd, dirtype: '1', ppm: 'grep'}, vtype: 'lf'};
    expect(core.getParent(4, pwd, vwd)).toEqual(obj);
  });
  it('on aux:path', () => {
    const pwd = `${process.cwd()}\\src\\mod\\__tests__`;
    const vwd = `aux://S_test\\${pwd}`;
    const obj = {pwd, metaSource: undefined, vtype: 'aux'};
    expect(core.getParent(1, pwd, vwd)).toEqual(obj);
  });
});
describe('correctWord()', function () {
  let word;
  let cmd = 'grep';
  it('pass some words with grep', () => {
    word = 'general';
    expect(core.correctWord(word, cmd)).toEqual(['general', 'general']);
    word = '^general$';
    expect(core.correctWord(word, cmd)).toEqual(['general', 'general']);
    word = 'path\\name\\.ext';
    expect(core.correctWord(word, cmd)).toEqual(['path\\name.ext', 'path\\\\name\\\\.ext']);
  });
});
describe('createResult()', function () {
  it('pass test.grep', () => {
    const viewstyle = PPx.Extract('%*getcust(S_ppm#user:grep_viewstyle)');
    const pwd = `${process.cwd()}\\src\\mod\\__tests__`;
    const obj = {
      dirtype: 1,
      pwd,
      keyword: 'cmd',
      path: `${pwd}\\test.grep`,
    };
    const result = [
      ';ListFile',
      `;Base=${pwd}|${obj.dirtype}`,
      ';Search=cmd',
      `;cmd=*viewstyle -temp format "${viewstyle}"`,
      ';ppm=grep',
      ';mapkey=K_ppmGrep',
      ';freq=every',
      '"cmd","37",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,T:"test1.ts"',
      '"123cmd","43",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,T:"test1.ts"',
      '"cmdあいうえお","5",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,T:"test2.ts"',
      '"アイウエオcmd","10",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,T:"test2.ts"'
    ];
    expect(core.createResult(obj)).toEqual([true, result]);
  });
});
