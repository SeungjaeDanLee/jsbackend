// call the sample-package
const calc = require("sample-package");

const a = 17;
const b = 3;

// sum
console.log(`a + b = ${calc.add(a, b)}`);
// sub
console.log(`a - b = ${calc.sub(a, b)}`);
// multi
console.log(`a * b = ${calc.multi(a, b)}`);
// div
console.log(`a / b = ${calc.div(a, b)}`);