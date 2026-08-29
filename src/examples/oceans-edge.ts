import { Card } from "../models/card";
import { Layout } from "../models/layout";
import { Rarity } from "../models/rarity";

export const oceansEdge: Card = {
  real: false,
  id: "example-3",
  rarity: Rarity.Rare,
  collectorNumber: "3",
  set: {
    code: "EXA",
    total: 3,
  },
  frontFace: {
    layout: Layout.Regular,
    parts: [{
      name: "Ocean's Edge",
      manaCost: "",
      typeline: "Land",
      artUri: "./oceans-edge.jpg",
      text: "Ocean's Edge enters tapped.\n{T}: Add {B}.\nSacrifice Oceans Edge, {4}, {T}: Put target creature on the bottom of it's owner's library. Search your library for a Basic Island and put it onto the battlefield tapped.",
      flavorText: "Unwary sailors are often lost to the depths of the unknown.",
      textScaling: 0.85,
      artist: "George Grie",
    }]
  }
}