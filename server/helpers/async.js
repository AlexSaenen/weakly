/* async Module
Here we write some asynchronous helper functions
*/

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
