import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "multiple-trigger-once",
    complexity: 1,
    categories: [
        "Triggers"
    ],
    cards: [
        { name: "Welcoming Vampire", setCode: "VOW" },
        { name: "Elesh Norn, Mother of Machines", setCode: "ONE" },
        { name: "Sanctuary Cat", setCode: "DKA" },
    ],
    setup: [
        "You control a [Welcoming Vampire]",
        "You control a [Elesh Norn, Mother of Machines]",
        "You play a [Sanctuary Cat] and it enters the battlefield",
    ],
    question: "How many cards will you draw?",
    answer: "1",
    explanation: [
        "[Welcoming Vampire] says it can only trigger once each turn.",
        "The 'additional time' that [Elesh Norn] allows would be the second trigger of [Welcoming Vampire] and therefore is prevented by the 'Once each turn'",
    ]
};

export default puzzle;
