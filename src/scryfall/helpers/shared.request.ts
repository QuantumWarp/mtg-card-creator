// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ongoingRequests = new Map<string, Promise<any>>();

export function fetchShared(url: string) {
  if (ongoingRequests.has(url)) {
    return ongoingRequests.get(url)!;
  }

  console.log("fetching", url);
  const fetchPromise = fetch(url)
    .then((x) => x.json())
    .finally(() => {
      setTimeout(() => ongoingRequests.delete(url), 1000);
    });

  ongoingRequests.set(url, fetchPromise);
  return fetchPromise;
};