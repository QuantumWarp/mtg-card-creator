import { Card } from "../models/card";
import { Layout } from "../models/layout";
import { Rarity } from "../models/rarity";

export const packCaller: Card = {
  real: false,
  id: "example-2",
  rarity: Rarity.Common,
  collectorNumber: "2",
  set: {
    code: "EXA",
    total: 3,
  },
  frontFace: {
    layout: Layout.Regular,
    parts: [{
      name: "Pack Caller",
      manaCost: "{1}{G}{W}",
      typeline: "Creature — Wolf",
      artUri: "./pack-caller.jpg",
      text: "When Pack Caller enters, look at the top 4 cards of your library. You may reveal any number of Wolf cards from among them and put them into your hand.",
      flavorText: "Where there is one, often there are\nmany.",
      artist: "Stiller Beobachter",
      power: 3,
      toughness: 3,
    }]
  }
}