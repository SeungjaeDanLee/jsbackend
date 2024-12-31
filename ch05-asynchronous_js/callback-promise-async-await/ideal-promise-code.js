function goodPromise(val) {
    // Return a new promise
    return new Promise((resolve, reject) => {
        resolve(val)
    });
}

goodPromise("세상에")
    .then((val) => {
        return val + " 이런";
    })
    .then((val) => {
        return val + " 코드는";
    })
    .then((val) => {
        return val + " 없습니다.";
    })
    .then((val) => {
        console.log(val);
    })
    // Error handling
    .catch((err) => {
        console.error(err);
    });