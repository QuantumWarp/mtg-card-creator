import flickerZeroToughness from "../flicker-zero-toughness";
import triggerOrder from "../trigger-order";
import priorityPlayingLands from "../priority-playing-lands";
import multipleEtb from "../multiple-etb";
import lifeTotalCantChange from "../life-total-cant-change";
import typechangingAbilities from "../typechanging-abilities";
import damageReplacement from "../damage-replacement";
import casting from "../casting";
import trampleDeathtouch from "../trample-deathtouch";
import powerToughnessLayers from "../power-toughness-layers";
import multipleTriggerOnce from "../multiple-trigger-once";
import planeswalkerCreatures from "../planeswalker-creatures";

export const puzzleList = [
  multipleEtb,
  casting,
  priorityPlayingLands,
  multipleTriggerOnce,
  trampleDeathtouch,
  planeswalkerCreatures,
  flickerZeroToughness,
  triggerOrder,
  lifeTotalCantChange,
  powerToughnessLayers,
  damageReplacement,
  typechangingAbilities,
].sort((a, b) => a.complexity - b.complexity);