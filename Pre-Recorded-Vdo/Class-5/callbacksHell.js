function delay(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}

console.log("Starting");

delay(2, () => {
  console.log("Waiting for 2 seconds");
  delay(1, () => {
    console.log("Waiting for 3 seconds");
    delay(1, () => {
      console.log("Waiting for 4 seconds");
      delay(1, () => {
        console.log("Waiting for 5 seconds");
      });
    });
  });
});

console.log("Ending");
