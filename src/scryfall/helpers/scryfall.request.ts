import { Semaphore } from "./semaphore";
import { fetchShared } from "./shared.request";

const semaphore = new Semaphore();

export const scryfallRequest = async (url: string) => {
  try {
    await semaphore.acquire();
    return await fetchShared(url);
  } finally {
    semaphore.release();
  }
}
