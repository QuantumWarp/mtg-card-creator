import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "damage-replacement",
    complexity: 4,
    categories: [
        "Replacement",
        "Damage"
    ],
    cards: [
        { name: "Torbran, Thane of Red Fell", setCode: "ELD" },
        { name: "Angrath's Marauders", setCode: "LCC" },
        { name: "Lightning Bolt", setCode: "M10" },
    ],
    setup: [
        "You control [Torbran, Thane of Red Fell] and [Angrath's Marauders]",
        "You cast [Lightning Bolt] targeting your opponent",
    ],
    question: "How much damage do they take?",
    answer: "Your opponent's choice of 8 or 10 damage",
    explanation: [
        "Both effects are replacement effects",
        "If two or more replacement effects are attempting to change the way an event affects an object or player, the affected player chooses the order in which to apply"

    ]
};

export default puzzle;
