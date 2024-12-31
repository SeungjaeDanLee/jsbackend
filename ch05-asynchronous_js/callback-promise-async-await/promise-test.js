const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;
    // const oldDBSize = DB.length + 1;
    DB.push(user);
    console.log(`save ${user.name} to DB`);

    // Promise object is returned
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            // If the save is successful, the user object is returned.
            resolve(user);
        } else {
            // If the save fails, an error object is returned.
            reject(new Error("Save DB Error!"));
        }
    });
}

function sendEmail(user) {
    console.log(`email to ${user.email}`);

    // Promise object is returned
    return new Promise((resolve) => {
        // If the email is sent successfully, the user object is returned.
        resolve(user);
    });
}

function getResult(user) {
    // Promise object is returned
    return new Promise((resolve, reject) => {
        // If the result is successful, a string is returned.
        resolve(`register success: ${user.name}`);
    });
}

function registerByPromise(user) {
    // Asynchronous call, but calls are made in order.
    const result = saveDB(user)
                    .then(sendEmail)
                    .then(getResult)
                    .catch(error => new Error(error))
                    .finally(() => console.log("Register process is completed."));
    // Pending because it is not yet completed
    console.log(result);
    return result;
}

const myUser = { email: "andy@test.com", password: "1234", name: "Andy" };
// const result = registerByPromise(myUser);
// // The result is a Promise object, so you need to use then to get the result.
// result.then(console.log);

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);