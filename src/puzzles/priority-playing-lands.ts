import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    complexity: 2,
    title: "Priority Playing Lands",
    categories: [
        "Priority"
    ],
    setup: [
        "Your opponent has a [Doom Blade] in hand and mana to cast it",
        "You have an [Eumidian Terrabotanist] and a [Forest] in hand",
        "You cast [Eumidian Terrabotanist]",
    ],
    question: "Can your opponent destroy your [Terrabotanist](Eumidian Terrabotanist) before you play your land to prevent you gaining 1 life?",
    answer: "No",
    explanation: [
        "Whenever an action is taken in the game the person whose turn it is gets priority to perform actions",
        "In this case you would immediately get priority after the [Eumidian Terrabotanist] enters",
        "You then can immediately play the [Forest], triggering your creature",
        "Note: If you also controlled something like [Ajani's Welcome], it would trigger, you would receive priority first, " +
        "but you would not be able to play the land at instant speed. This would result in your opponent getting the chance to destroy your creature."
    ]
};

export default puzzle;
