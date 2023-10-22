/// <reference lib="webworker" />
import inspectionApi from "../services/api";
import { Db } from "../services/clientdb";

// if (typeof navigator.storage !== undefined) {
//   navigator.storage.persisted().then((isPer) => {
//     console.log("form web worker message");
//     console.log({ isPer });
//     if (!isPer) {
//       navigator.storage.persist().then((isAllow) => console.log(isAllow));
//     } else {
//       console.log("already allower, message from web worker");
//     }
//   });
// }

self.addEventListener("message", async (e) => {
  if (e.data.type === "init") {
    const allLibraryItems = await getLibraryItems();
    if (allLibraryItems && Array.isArray(allLibraryItems)) {
      const success = await setupDatabase(allLibraryItems);
      if (success) {
        self.postMessage({ type: "installed", success: true });
        return;
      }
    }
    self.postMessage({ type: "error", success: false });
  }
  console.log("Message recieved in web worker");
});

const getLibraryItems = async () => {
  try {
    let sent = 0;
    const options = {
      onDownloadProgress: (e: any) => {
        let progress = Math.floor(e.progress * 100);
        if (progress % 2 === 0 && sent !== progress) {
          self.postMessage({ type: "installingItems", progress });
          sent = progress;
        }
      },
    };

    const response = await inspectionApi.get(
      "/all-library-items.json",
      options
    );
    if (response.statusText === "OK" && response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const setupDatabase = async (allLibraryItems: any[]) => {
  try {
    let sent = -1;
    for (let i = 0; i < allLibraryItems.length; i++) {
      const item = allLibraryItems[i];
      item.id = Date.now().toString(36);

      await Db.libraryItems.add(item);
      const progress = Math.floor((i / allLibraryItems.length) * 100);
      if (progress !== sent) {
        self.postMessage({ type: "", progress });
        sent = progress;
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
