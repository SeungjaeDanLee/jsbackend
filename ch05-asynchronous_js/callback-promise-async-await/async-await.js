async function myName() {
    return "Andy";
}

// There is a function that shows the name
async function showName() {
    const name = await myName();
    console.log(name);
}

// Call the function and show the name in the console
console.log(showName());

// The function that waits for one second
function waitOneSecond(msg) {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(`${msg}`), 1000);
    });
}

// The function that counts from one to ten
async function countOneToTen() {
    // Loop through the numbers from 0 to 9
    for (let x of [...Array(10).keys()]) {
        // Wait for one second
        let result = await waitOneSecond(`Counting ${x + 1}`);
        console.log(result);
    }
    console.log("Done!");
}

countOneToTen();