/* @flow */
import path from 'path';
import fs from 'fs';

export const javascriptExtensions = ['.js'];
export const testExtensions = ['.test', '.spec'];
export const typesExtensions = ['.types'];

export const getPath = (basePath: string) => (file: string) => path.join(basePath, file);
export const getFileName = (file: string) => path.basename(file);

export const getFileExtension = (file: string) => path.extname(file);
export const withoutExtension = (file: string) => path.basename(file, getFileExtension(file));
export const hasExtension = (extensions: Array<string>) =>
  (file: string) => extensions.includes(getFileExtension(file));
export const hasJavascriptExtension = hasExtension(javascriptExtensions);
export const hasTestExtension = hasExtension(testExtensions);
export const hasTypesExtension = hasExtension(typesExtensions);

export const isAFile = (file: string) => fs.lstatSync(file).isFile();
export const isADirectory = (file: string) => fs.lstatSync(file).isDirectory();
export const isNotIndex = (file: string) => withoutExtension(file) !== 'index';
export const isNotTest = (file: string) =>
  hasTestExtension(file) === false && // something.test
  hasTestExtension(withoutExtension(file)) === false; // something.test.js
export const isNotTypes = (file: string) =>
  hasTypesExtension(file) === false && // something.types
  hasTypesExtension(withoutExtension(file)) === false; // something.types.js

export const isNotATestFile = (file: string) => isAFile(file) && isNotTest(file);
export const isNotATypesFile = (file: string) => isAFile(file) && isNotTypes(file);
export const isAJavascriptFile = (file: string) => isAFile(file) && hasJavascriptExtension(file);
