/// <reference lib="webworker" />
import { Db } from "../services/clientdb/db";

if (typeof navigator.storage !== undefined) {
  navigator.storage.persisted().then((isPer) => {
    console.log("form web worker message");
    console.log({ isPer });
    if (!isPer) {
      navigator.storage.persist().then((isAllow) => console.log(isAllow));
    } else {
      console.log("already allower, message from web worker");
    }
  });
}

self.addEventListener("message", async (e) => {
  if (e.data.type === "init") {
    const response = await fetch("/all-library-items.json");
    console.log(response);
    if (response.ok) {
      const allLibraryItems = await response.json();
      for (let i = 0; i < allLibraryItems.length; i++) {
        const item = allLibraryItems[i];
        item.id = Date.now().toString(36);

        const res = await Db.libraryItems.add(item);
        self.postMessage(res)
      }
    }
  }
  console.log("Message recieved in web worker");
});
