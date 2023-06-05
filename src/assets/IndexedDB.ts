export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open("Download", 1);
    request.onsuccess = function () {
      resolve(this.result);
    };
    request.onerror = function (event) {
      reject(event);
    };
    request.onupgradeneeded = function () {
      const db = this.result;
      const objectStore = db.createObjectStore("FileStorage", {
        autoIncrement: true,
        keyPath: "id",
      });

      objectStore.createIndex("fileHref", "fileHref");
    };
  });
};

export const dbCheckHref = async (db: IDBDatabase, href: string): Promise<boolean> => {
  const transaction = db.transaction(["FileStorage"], "readwrite");
  const objectStore = transaction.objectStore("FileStorage");
  const request = objectStore.index("fileHref").get(href);
  return new Promise((resolve) => {
    request.onsuccess = function () {
      if (this.result !== undefined) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
    request.onerror = () => {
      resolve(false);
    };
  });
};
