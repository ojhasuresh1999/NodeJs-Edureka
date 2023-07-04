console.log("started");

new Promise((resolve, reject) => {
  resolve();
})
  .then((value) => {
    return 1;
  })
  .then((value) => {
    setTimeout(() => {
      console.log("1 second timeout");
    }, value * 1000);
    return 2;
  })
  .then((value) => {
    setTimeout(() => {
      console.log("2 second timeout");
    }, value * 2000);
    return 3;
  })
  .then((value) => {
    setTimeout(() => {
      console.log("3 second timeout");
    }, value * 3000);
    return 4;
  })
  .catch((err) => {
    console.log(err);
  });

console.log("stopped");
