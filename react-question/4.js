/** Can you explain about Interface and Enum, and where will you be using,
please make some examples. **/

/*
 * 在 JS 中沒有原生的 Interface 和 Enum，但是可以使用 TypeScript 來實現。
 * 以下解釋它們在 TypeScript 中的用法以及在什麼情況下使用 (題目要求全部用JS實現我也會展示用JS來模擬這兩個用法)。
 *
 * Interface:
 * 在 TypeScript 中，Interface 用於定義對象的形狀，即指定對象應該包含哪些屬性以及它們類型。
 * 可以幫助我們在編譯時期捕獲類型錯誤，確保我們的代碼符合預期。
 *
 */

/* 

TypeScript範例：

interface User {
  name: string;
  age: number;
}

function exampleInterfaceCase(user: User) {
  console.log(`Hello, ${user.name}`);
}

exampleInterfaceCase({ name: 'Vic', age: 30 }); // 正確執行
exampleInterfaceCase({ name: 'Agnes' }); // 缺少 age 屬性，編譯時期會報錯

*/

// JS 模擬 Interface:

function exampleInterfaceCase(user) {
  if (typeof user.name === 'string' && typeof user.age === 'number') {
    console.log(`Hello, ${user.name}`);
  } else {
    console.error('Type error');
  }
}

exampleInterfaceCase({ name: 'Vic', age: 30 }); // 正確執行
exampleInterfaceCase({ name: 'Agnes' }); // 執行時會報錯

/*
 * Enum:
 * 在 TypeScript 的 Enum 是一種特殊的類型，它允許為一組數值賦予友好的名字。
 * Enum 是用於定義命名的常量一種方式，可以讓程式碼更容易理解與維護。
 */

/*

enum Typescript範例：
 
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function move(direction: Direction) {
  console.log(`Moving ${Direction[direction]}`);
}

move(Direction.Up); // 輸出：Moving UP

*/

// JS 模擬 Enum:
const Direction = {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT',
};

function move(direction) {
  console.log(`Moving ${direction}`);
}

move(Direction.Up); // 輸出：Moving UP
