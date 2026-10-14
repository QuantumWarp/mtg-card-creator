const requestPromise = <T>(request: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const transactionPromise = (transaction: IDBTransaction): Promise<void> => {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

export const indexedDbStore = (dbName: string, storeName: string, options?: IDBObjectStoreParameters) => {
  let dbPromise: Promise<IDBDatabase> | undefined;

  const openDb = (): Promise<IDBDatabase> => {
    if (!dbPromise) {
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(storeName, options);
      dbPromise = requestPromise(request);
    }
    return dbPromise;
  };

  return async <T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> => {
    const db = await openDb();
    const transaction = db.transaction(storeName, mode);
    const [result] = await Promise.all([
      requestPromise(action(transaction.objectStore(storeName))),
      transactionPromise(transaction),
    ]);
    return result;
  };
};
