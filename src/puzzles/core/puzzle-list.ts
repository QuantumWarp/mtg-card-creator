import flickerZeroToughness from "../flicker-zero-toughness";
import triggerOrder from "../trigger-order";
import priorityPlayingLands from "../priority-playing-lands";
import multipleEtb from "../multiple-etb";
import lifeTotalCantChange from "../life-total-cant-change";

export const puzzleList = [
  flickerZeroToughness,
  triggerOrder,
  priorityPlayingLands,
  multipleEtb,
  lifeTotalCantChange
].sort((a, b) => a.complexity - b.complexity);