import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "life-total-cant-change",
    complexity: 3,
    categories: [
        "Dealing Damage",
        "Life Total"
    ],
    cards: [
        { name: "Platinum Emperion", setCode: "SOM" },
        { name: "Trygon Predator", setCode: "FDN" }
    ],
    setup: [
        "You control a tapped [Platinum Emperion]",
        "Your opponent controls a [Trygon Predator]",
        "Your opponent attacks you with the [Trygon Predator]",
    ],
    question: "Will your opponent be able to destroy your [Emperion]?",
    answer: "Yes",
    explanation: [
        "Although your life total cannot change due to the effect of [Platinum Emperion], " +
        "damage is still dealt to you by the [Trygon Predator] when it attacks.",
        "Damage causes life loss, but life loss is not a required for damage to be dealt.",
    ]
};

export default puzzle;
