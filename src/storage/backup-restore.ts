import { NavigateFunction } from "react-router-dom";
import { Card } from "../models/card";
import { deleteCard, getCards, saveCard } from "./card.storage";

export function backup() {
  const cards = getCards();
  const filteredCards = cards.filter((x) => !x.id.startsWith("example"));
  const backupStr = JSON.stringify(filteredCards, null, 2);
  const blob = new Blob([backupStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mtg-card-creator-backup-${new Date().getTime()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function restore(file: File, navigate: NavigateFunction) {
  if (!file || file.type !== "application/json") return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const json: Card[] = JSON.parse(e.target?.result as string);
    for (const card of getCards()) {
      deleteCard(card);
    }
    for (const card of json) {
      saveCard(card);
    }
    navigate("/", { replace: true });
  };
  reader.readAsText(file);
}
