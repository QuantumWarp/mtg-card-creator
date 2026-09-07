import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "casting",
    complexity: 1,
    categories: [
        "Playing",
        "Casting"
    ],
    cards: [
        { name: "Gonti, Lord of Luxury", setCode: "KLD" },
        { name: "Swamp", setCode: "BFZ" },
        { name: "Blightwing Bandit", setCode: "WOC", afterReveal: true },
    ],
    setup: [
        "You play [Gonti, Lord of Luxury]",
        "You find an exile a [Swamp] with [Gonti]'s ability",
    ],
    question: "Can you play the [Swamp]?",
    answer: "No",
    explanation: [
        "[Gonti] says you may 'cast' the card",
        "Lands cannot be cast, they can only be 'played'",
        "Similar effects, such as from [Blightwing Bandit] specifically say 'play that card', which would allow the [Swamp] to be played"
    ]
};

export default puzzle;
