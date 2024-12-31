function myWork(work) {
  return new Promise((resolve, reject) => {
      if (work === 'done') {
        resolve('playing game');
      } else {
          reject(new Error("not playing game"));
      }
  });
}

// It is not different from the callback anti-pattern
myWork('done')
    .then(function(value) {
        console.log(value);
    }, function(err) {
        console.error(err);
    });

myWork('doing')
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err) {
        console.error(err);
    });