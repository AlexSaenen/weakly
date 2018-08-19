/* @flow */
import path from 'path';
import fs from 'fs';

const javascriptExtensions = ['.js'];

export const getPath = (basePath: string) => (file: string) => path.join(basePath, file);

export const getFileExtension = (file: string) => path.extname(file);
export const withoutExtension = (file: string) => path.basename(file, getFileExtension(file));
export const hasExtension = (extensions: Array<string>) =>
  (file: string) => extensions.includes(getFileExtension(file));
export const hasJavascriptExtension = hasExtension(javascriptExtensions);

export const isAFile = (file: string) => fs.lstatSync(file).isFile();
export const isADirectory = (file: string) => fs.lstatSync(file).isDirectory();
export const isNotIndex = (file: string) => withoutExtension(file) !== 'index';
export const isNotTest = (file: string) =>
  withoutExtension(file).endsWith('.test') === false
  && getFileExtension(file).endsWith('.test') === false;
export const isNotATestFile = (file: string) => isAFile(file) && isNotTest(file);
export const isAJavascriptFile = (file: string) => isAFile(file) && hasJavascriptExtension(file);
