const DB = [];

// sign up API function
function register(user) {
    // 3 callbacks
    return saveDB(user, function (user) {
        // callback
        return sendEmail(user, function (user) {
            // callback
            return getResult(user);
        });
    }) 
}

// save user to DB
function saveDB(user, callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

// Executes a callback after executing the code that leaves only the email sending log.
function sendEmail(user, callback) {
    console.log(`email to ${user.email}`);
    return callback(user);
}

// Get the result of the callback function.
function getResult(user) {
    return `register success: ${user.name}`;
}

const result = register({ email: "andy@test.com", password: "1234", name: "Andy" });
console.log(result);