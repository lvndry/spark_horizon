const inquirer = require('inquirer');

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let code;
let keyword;

function encoder(key) {
    let encoded = '';
    let arr = Array(26).fill(0);

    // This loop inserts the keyword
    // at the start of alphabet
    for (let i = 0, length = key.length; i< length; i++) {
        // To check whether the character is inserted
        // earlier in the encoded string or not
        if (arr[key[i].charCodeAt(0)-65] === 0) {
          encoded += key[i];
          arr[key[i].charCodeAt(0)-65] = 1;
      }
    }

    // This loop inserts the remaining
    // characters in the encoded string.
    for (let i = 0; i < 26; i++) {
      if(arr[i] == 0) {
        encoded += String.fromCharCode(i + 65);
        arr[i] = 1;
      }
    }
    return encoded;
}

function decode(code, codeAlphabet) {
    let map = {};
    for (let i = 0; i < codeAlphabet.length; i++) {
      map[codeAlphabet[i]] = i;
    }
    let decoded = '';
    for (let i = 0; i < code.length; i++) {
      let pos = map[code[i]];
      decoded += alphabet[pos];
    }
    return decoded;
}

inquirer.prompt([
  {
    message: 'Type the keyword: ',
    name: 'keyword',
    type: 'input',
    validate: (input) => {
      if (typeof input === 'string') {
        return true;
      }
      console.log('keyword must be an string');
      return false;
    }
  },
  {
    message: 'Type the code: ',
    name: 'code',
    type: 'input',
    validate: (input) => {
      if (typeof input === 'string') {
        return true;
      }
      console.log('Code mhust be an string');
      return false;
    }
  }
]).then((answers) => {
  keyword = answers.keyword.toUpperCase();
  code = answers.code.toUpperCase();
  return true;
})
.then(() => {
  const encoded = encoder(keyword);
  console.log(encoded);
  const decoded = decode(code, encoded);
  console.log(decoded);
})
