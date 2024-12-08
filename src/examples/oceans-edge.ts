import { Card } from "../models/card";
import { v4 as uuid } from "uuid";

export const oceansEdge: Card = {
  id: uuid(),
  name: "Ocean's Edge",
  manaCost: "",
  typeline: "Land",
  set: {
    cardCount: 3,
    code: "EXA"
  },
  collectorNumber: "3",
  rarity: "rare",
  artUri: "./oceans-edge.jpg",
  text: "Ocean's Edge enters tapped.\n{T}: Add {B}.\nSacrifice Oceans Edge, {4}, {T}: Put target creature on the bottom of it's owner's library. Search your library for a Basic Island and put it onto the battlefield tapped.",
  flavorText: "Unwary sailors are often lost to the depths of the unknown.",
  artist: "George Grie"
}