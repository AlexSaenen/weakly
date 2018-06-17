import fs from 'fs';

import * as fsHelpers from './fs';

describe('getPath', () => {
  const { getPath } = fsHelpers;

  test('a folder and a file are joined in one path', () => {
    const filePath = getPath('afolder')('somefile');
    expect(filePath).toBe('afolder/somefile');
  });

  test('a path of folders and a file are joined in one path', () => {
    const filePath = getPath('afolder/subfolder')('somefile');
    expect(filePath).toBe('afolder/subfolder/somefile');
  });

  test('overage / in folder path are discarded', () => {
    const filePath = getPath('afolder/')('somefile');
    expect(filePath).toBe('afolder/somefile');
  });

  test('initial / in file path are discarded', () => {
    const filePath = getPath('afolder')('/somefile');
    expect(filePath).toBe('afolder/somefile');
  });

  test('overage / in file path is kept', () => {
    const filePath = getPath('afolder')('somefile/');
    expect(filePath).toBe('afolder/somefile/');
  });
});

describe('getFileExtension', () => {
  const { getFileExtension } = fsHelpers;

  test('it returns ".js" if sent "index.js"', () => {
    const extension = getFileExtension('index.js');
    expect(extension).toBe('.js');
  });

  test('it returns ".jsx" if sent "index.test.jsx"', () => {
    const extension = getFileExtension('index.test.jsx');
    expect(extension).toBe('.jsx');
  });

  test('it returns an empty string if sent "index"', () => {
    const extension = getFileExtension('index');
    expect(extension).toBe('');
  });
});

describe('withoutExtension', () => {
  const { withoutExtension } = fsHelpers;

  test('it returns "index" if sent "index.js"', () => {
    const file = withoutExtension('index.js');
    expect(file).toBe('index');
  });

  test('it returns "index.test" if sent "index.test.js"', () => {
    const file = withoutExtension('index.test.js');
    expect(file).toBe('index.test');
  });

  test('it returns ".js" string if sent ".js"', () => {
    const file = withoutExtension('.js');
    expect(file).toBe('.js');
  });
});

describe('hasExtension and hasJavascriptExtension', () => {
  const {
    hasExtension,
    hasJavascriptExtension,
  } = fsHelpers;

  test('hasExtension returns true when sent [".cpp"] and "index.cpp"', () => {
    const extensions = ['.cpp'];
    const file = 'index.cpp';
    expect(hasExtension(extensions)(file)).toBeTruthy();
  });

  test('hasExtension returns true if the extension is further in the array', () => {
    const extensions = ['.lua', '.html', '.cpp'];
    const file = 'index.cpp';
    expect(hasExtension(extensions)(file)).toBeTruthy();
  });

  test('hasExtension returns false if extension is not in array', () => {
    const extensions = ['.lua', '.html'];
    const file = 'index.cpp';
    expect(hasExtension(extensions)(file)).toBeFalsy();
  });

  test('hasJavascriptExtension returns true if given "index.js"', () => {
    const file = 'index.js';
    expect(hasJavascriptExtension(file)).toBeTruthy();
  });

  test('hasJavascriptExtension returns false if given "index.cpp"', () => {
    const file = 'index.cpp';
    expect(hasJavascriptExtension(file)).toBeFalsy();
  });
});

describe('isNotIndex', () => {
  const { isNotIndex } = fsHelpers;

  test('it returns true if given "fs.js"', () => {
    const file = 'fs.js';
    expect(isNotIndex(file)).toBeTruthy();
  });

  test('it returns false if given "index.js"', () => {
    const file = 'index.js';
    expect(isNotIndex(file)).toBeFalsy();
  });

  test('it returns true if given "index.test.js"', () => {
    const file = 'index.test.js';
    expect(isNotIndex(file)).toBeTruthy();
  });
});

describe('isNotTest', () => {
  const { isNotTest } = fsHelpers;

  test('it returns true if given "fs.js"', () => {
    const file = 'fs.js';
    expect(isNotTest(file)).toBeTruthy();
  });

  test('it returns true if given "test.js"', () => {
    const file = 'test.js';
    expect(isNotTest(file)).toBeTruthy();
  });

  test('it returns false if given "index.test.js"', () => {
    const file = 'index.test.js';
    expect(isNotTest(file)).toBeFalsy();
  });
});

describe('isAFile and isAJavascriptFile', () => {
  const {
    isAFile,
    isAJavascriptFile,
    getPath,
  } = fsHelpers;

  const pathToTestFolder = getPath(__dirname)('testFolder');

  beforeAll(() => {
    try {
      fs.rmdirSync(pathToTestFolder);
    } catch (fsError) { console.log('Creating new testFolder'); }
    fs.mkdirSync(pathToTestFolder);
  });

  afterAll(() => {
    fs.rmdirSync(pathToTestFolder);
  });

  test('isAFile and isAJavascriptFile return both true if given path to "fs.js"', () => {
    const file = getPath(__dirname)('fs.js');
    expect(isAFile(file)).toBeTruthy();
    expect(isAJavascriptFile(file)).toBeTruthy();
  });

  test('isAFile and isAJavascriptFile return both false for path to "testFolder"', () => {
    expect(isAFile(pathToTestFolder)).toBeFalsy();
    expect(isAJavascriptFile(pathToTestFolder)).toBeFalsy();
  });
});
