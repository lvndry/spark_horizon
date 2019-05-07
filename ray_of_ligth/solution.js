const inquirer = require('inquirer');

const UP = -1;
const DOWN = 1;
const LEFT = -1;
const RIGTH = 1;

const window = {
  heigth: 4,
  width: 8,
};

let result = [];
let ligth = {};
let rank = 1;

function init() {
  ligth = { x: 0, y: 0,  horizontal: RIGTH, vertical: DOWN };
  result = [];
  for (let i = 0; i < window.heigth; i++) {
    const line = Array(window.width).fill(0);
    result.push(line);
  }
  result[ligth.y][ligth.x] = 1;
  console.log(result);
}

function followTheLigth() {
  do {
    ligth.x += ligth.horizontal;
    ligth.y += ligth.vertical;
    rank += 1;

    if (result[ligth.y][ligth.x] === 0) {
      result[ligth.y][ligth.x] = rank;
    }
    if (ligth.x === window.width-1) {
      ligth.horizontal = LEFT;
    }
    if (ligth.x === 0) {
      ligth.horizontal = RIGTH;
    }
    if (ligth.y === window.heigth-1) {
      ligth.vertical = UP;
    }
    if (ligth.y === 0) {
      ligth.vertical = DOWN;
    }
  } while (result[window.heigth-1][window.width-1] === 0);
  console.log('DONE!');
  console.log(result);
}

inquirer.prompt([
  {
    message: 'Type width of the window (Default 8) ',
    name: 'width',
    type: 'number',
    validate: (input) => {
      if (typeof input === 'number') {
        return true;
      }
      console.log('Width must be an number');
      return false;
    }
  },
  {
    message: 'Type heigth of the window (Default 4) ',
    name: 'heigth',
    type: 'number',
    validate: (input) => {
      if (typeof input === 'number') {
        return true;
      }
      console.log('Heigt mhust be an number');
      return false;
    }
  }
]).then((answers) => {
  if (answers.width) {
    window.width = answers.width;
  }
  if (answers.heigth) {
    window.heigth = answers.heigth
  }
  return window;
})
.then(() => {
  init();
  followTheLigth();
});
