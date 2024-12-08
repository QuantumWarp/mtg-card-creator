import { Card } from "../models/card";
import { v4 as uuid } from "uuid";

export const packCaller: Card = {
  id: uuid(),
  name: "Pack Caller",
  manaCost: "{1}{G}{W}",
  typeline: "Creature — Wolf",
  set: {
    cardCount: 3,
    code: "EXA"
  },
  collectorNumber: "2",
  rarity: "common",
  artUri: "./pack-caller.jpg",
  text: "When Pack Caller enters, look at the top 4 cards of your library. You may reveal any number of Wolf cards fromo among them and put them into your hand.",
  flavorText: "Where there is one, often there are many.",
  artist: "Stiller Beobachter",
  power: 3,
  toughness: 3
}