import { Card } from "../models/card";
import { v4 as uuid } from "uuid";
import { Rarity } from "../models/rarity";

export const crystallize: Card = {
  id: uuid(),
  name: "Crystallize",
  manaCost: "{3}{U}{U}",
  typeline: "Instant",
  set: {
    cardCount: 3,
    code: "EXA"
  },
  collectorNumber: "1",
  rarity: Rarity.Uncommon,
  artUri: "./crystallize.jpg",
  text: "Tap up to 2 target creatures. Put a stun counter on each creature with toughness 3 or less.",
  flavorText: "The depths of winter always prove a challenge for even the most hardy creatures.",
  artist: "Peter .v .b"
}