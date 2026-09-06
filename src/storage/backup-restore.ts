import { NavigateFunction } from "react-router-dom";
import { Card } from "../models/card";
import { getCards, saveCard } from "./card.storage";

export function backup() {
  const cards = getCards();
  const backupStr = JSON.stringify(cards, null, 2);
  const blob = new Blob([backupStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mtg-card-creator-backup-${new Date().getTime()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function backupCard(card: Card) {
  const backupStr = JSON.stringify(card, null, 2);
  const blob = new Blob([backupStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const cardName = card.frontFace.parts[0].name
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .replace(" ", "-").toLowerCase()
    || "custom";
  link.href = url;
  link.download = `mtg-card-creator-${cardName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function restore(file: File, navigate: NavigateFunction) {
  if (!file || file.type !== "application/json") return;
  const reader = new FileReader();

  const cards = await new Promise<Card[]>((resolve) => {
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const data = JSON.parse(result);
      const isArray = Array.isArray(data);
      const cards: Card[] = isArray ? data : [data];
      resolve(cards);
    };
    reader.readAsText(file);
  });
  
  for (const card of cards) {
    saveCard(card);
  }
  navigate("/", { replace: true });
}

export function deleteAllData() {
  localStorage.clear()
}
