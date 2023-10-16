/// <reference lib="webworker" />

self.addEventListener("message", (e) => {
  console.log(e);
  console.log("Message recieved in web worker")
})
