export const localStorageCache = async <T>(
  key: string,
  func: () => Promise<T>,
): Promise<T> => {
  const cachedString = localStorage.getItem(key);
  if (cachedString) {
    const value = JSON.parse(cachedString);
    return value;
  }

  const value = await func();
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);

  return value;
}
