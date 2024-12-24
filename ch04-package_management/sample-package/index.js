// Executed when a module is included with the require function.
console.log("require로 부르면 실행됩니다.");

// Export the function
module.exports = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multi: (a, b) => a * b,
    div: (a, b) => a / b
}