import { Semaphore } from "./semaphore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ongoingRequests = new Map<string, Promise<any>>();
const semaphore = new Semaphore();

export const scryfallRequest = async (url: string) => {
  const existingRequest = ongoingRequests.get(url);
  if (existingRequest) {
    return await existingRequest;
  }

  const fetchPromise = fetchInSemaphore(url)
    .finally(() => setTimeout(() => ongoingRequests.delete(url), 1000));
  ongoingRequests.set(url, fetchPromise);

  return await fetchPromise;
}

const fetchInSemaphore = async (url: string) => {
  try {
    await semaphore.acquire();

    console.debug("fetching", url);
    const result = await fetch(url);
    const json = await result.json();
  
    return json;
  } finally {
    semaphore.release();
  }
}
