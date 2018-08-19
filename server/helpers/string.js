/* @flow */
export const capitalize = (string: string = '') => {
  const [firstLetter, ...restOfString] = string;
  const hasAFirstLetter = (firstLetter !== undefined);
  const capitalizedFirstLetter = (hasAFirstLetter ? firstLetter.toUpperCase() : '');
  return [capitalizedFirstLetter, ...restOfString].join('');
};

// eslint-disable-next-line
export const strIncludesOneOf = (searchedString: string, arrayOfString: Array<string>) =>
  arrayOfString.some((stringFromArray) => {
  //   console.log(`>"${searchedString}"  "${stringFromArray}"`);

  //   if (searchedString.includes(stringFromArray)) {
  //     console.log(`"${searchedString}" matched with: "${stringFromArray}"`);
  //   }
    return searchedString.includes(stringFromArray);
  });
