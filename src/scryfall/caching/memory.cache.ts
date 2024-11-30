// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: Record<string, any> = {};

export const getFromMemoryCache = (key: string) => {
  return cache[key];
}

export const memoryCache = async <T>(
  key: string,
  func: () => Promise<T>,
): Promise<T> => {
  const cachedData = cache[key];
  if (cachedData) return cachedData;

  const value = await func();
  cache[key] = value;

  return value;
}
