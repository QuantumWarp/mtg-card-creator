import { Card } from "../models/card";
import { Layout } from "../models/layout";
import { Rarity } from "../models/rarity";

export const crystallize: Card = {
  real: false,
  id: "example-1",
  rarity: Rarity.Uncommon,
  collectorNumber: "1",
  set: {
    code: "EXA",
    total: 3,
  },
  frontFace: {
    layout: Layout.Regular,
    parts: [{
      name: "Crystallize",
      manaCost: "{3}{U}{U}",
      typeline: "Instant",
      artUri: "./crystallize.jpg",
      text: "Tap up to 2 target creatures. Put a stun counter on each creature with toughness 3 or less.",
      flavorText: "The depths of winter always prove a challenge for even the most hardy creatures.",
      artist: "Peter .v .b",
    }]
  }
}