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

describe('getFileName', () => {
  const { getFileName } = fsHelpers;

  test('given "test" returns "test"', () => {
    const fileName = getFileName('test');
    expect(fileName).toBe('test');
  });

  test('given "/test" returns "test"', () => {
    const fileName = getFileName('/test');
    expect(fileName).toBe('test');
  });

  test('given "a/relative/path/test" returns "test"', () => {
    const fileName = getFileName('a/relative/path/test');
    expect(fileName).toBe('test');
  });

  test('given "/an/absolute/path/test" returns "test"', () => {
    const fileName = getFileName('/an/absolute/path/test');
    expect(fileName).toBe('test');
  });

  test('given "/a/path/test.ext" returns "test.ext"', () => {
    const fileName = getFileName('/a/path/test.ext');
    expect(fileName).toBe('test.ext');
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

describe('hasExtension, hasJavascriptExtension, hasTypesExtension and hasTestExtension', () => {
  const {
    hasExtension,
    javascriptExtensions,
    testExtensions,
    typesExtensions,
    hasJavascriptExtension,
    hasTestExtension,
    hasTypesExtension,
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

  test('hasJavascriptExtension returns true if given any javascriptExtensions', () => {
    const fileName = 'index';
    const filesWithExtension = javascriptExtensions.map(ext => `${fileName}${ext}`);

    filesWithExtension.forEach((file) => {
      expect(hasJavascriptExtension(file)).toBeTruthy();
    });
  });

  test('hasJavascriptExtension returns false if given "index.cpp"', () => {
    const file = 'index.cpp';
    expect(hasJavascriptExtension(file)).toBeFalsy();
  });

  test('hasTestExtension returns true if given any testExtensions', () => {
    const fileName = 'index';
    const filesWithExtension = testExtensions.map(ext => `${fileName}${ext}`);

    filesWithExtension.forEach((file) => {
      expect(hasTestExtension(file)).toBeTruthy();
    });
  });

  test('hasTestExtension returns false if given "index.cpp"', () => {
    const file = 'index.cpp';
    expect(hasTestExtension(file)).toBeFalsy();
  });

  test('hasTypesExtension returns true if given any typesExtensions', () => {
    const fileName = 'index';
    const filesWithExtension = typesExtensions.map(ext => `${fileName}${ext}`);

    filesWithExtension.forEach((file) => {
      expect(hasTypesExtension(file)).toBeTruthy();
    });
  });

  test('hasTypesExtension returns false if given "index.cpp"', () => {
    const file = 'index.cpp';
    expect(hasTypesExtension(file)).toBeFalsy();
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
  const { isNotTest, getPath } = fsHelpers;

  const pathToTestFolder = getPath(__dirname)('folder.test');

  beforeAll(() => {
    try {
      fs.rmdirSync(pathToTestFolder);
    } catch (fsError) { /* folder does not already exist */ }
    fs.mkdirSync(pathToTestFolder);
  });

  afterAll(() => {
    fs.rmdirSync(pathToTestFolder);
  });

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

  test('it returns false if given a folder "folder.test"', () => {
    expect(isNotTest(pathToTestFolder)).toBeFalsy();
  });
});

describe('isNotTypes', () => {
  const { isNotTypes, getPath } = fsHelpers;

  const pathToTypesFolder = getPath(__dirname)('folder.types');

  beforeAll(() => {
    try {
      fs.rmdirSync(pathToTypesFolder);
    } catch (fsError) { /* folder does not already exist */ }
    fs.mkdirSync(pathToTypesFolder);
  });

  afterAll(() => {
    fs.rmdirSync(pathToTypesFolder);
  });

  test('it returns true if given "fs.js"', () => {
    const file = 'fs.js';
    expect(isNotTypes(file)).toBeTruthy();
  });

  test('it returns true if given "types.js"', () => {
    const file = 'types.js';
    expect(isNotTypes(file)).toBeTruthy();
  });

  test('it returns false if given "index.types.js"', () => {
    const file = 'index.types.js';
    expect(isNotTypes(file)).toBeFalsy();
  });

  test('it returns false if given a folder "folder.types"', () => {
    expect(isNotTypes(pathToTypesFolder)).toBeFalsy();
  });
});

describe('isNotATestFile', () => {
  const {
    isNotATestFile,
    getPath,
  } = fsHelpers;

  const pathToTestFolder = getPath(__dirname)('folder.test');

  beforeAll(() => {
    try {
      fs.rmdirSync(pathToTestFolder);
    } catch (fsError) { /* folder does not already exist */ }
    fs.mkdirSync(pathToTestFolder);
  });

  afterAll(() => {
    fs.rmdirSync(pathToTestFolder);
  });

  test('isNotATestFile returns true if given path to "fs.js"', () => {
    const file = getPath(__dirname)('fs.js');
    expect(isNotATestFile(file)).toBeTruthy();
  });

  test('isNotATestFile returns false if given path to "fs.spec.js"', () => {
    const file = getPath(__dirname)('fs.spec.js');
    expect(isNotATestFile(file)).toBeFalsy();
  });

  test('isNotATestFile returns false for path to "folder.test"', () => {
    expect(isNotATestFile(pathToTestFolder)).toBeFalsy();
  });
});

describe('isNotATypesFile', () => {
  const {
    isNotATypesFile,
    getPath,
  } = fsHelpers;

  const pathToTypesFolder = getPath(__dirname)('folder.types');
  const pathToTypesFile = getPath(__dirname)('fs.types.js');

  beforeAll(() => {
    try {
      fs.rmdirSync(pathToTypesFolder);
    } catch (fsError) { /* folder does not already exist */ }
    fs.mkdirSync(pathToTypesFolder);

    if (fs.existsSync(pathToTypesFile) === false) {
      fs.writeFileSync(pathToTypesFile);
    }
  });

  afterAll(() => {
    fs.rmdirSync(pathToTypesFolder);
    fs.unlinkSync(pathToTypesFile);
  });

  test('isNotATypesFile returns true if given path to "fs.js"', () => {
    const file = getPath(__dirname)('fs.js');
    expect(isNotATypesFile(file)).toBeTruthy();
  });

  test('isNotATypesFile returns false if given path to "fs.types.js"', () => {
    expect(isNotATypesFile(pathToTypesFile)).toBeFalsy();
  });

  test('isNotATypesFile returns false for path to "folder.types"', () => {
    expect(isNotATypesFile(pathToTypesFolder)).toBeFalsy();
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
    } catch (fsError) { /* folder does not already exist */ }
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
