import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "typechanging-abilities",
    complexity: 4,
    categories: [
        "Typechanging",
        "Layers"
    ],
    cards: [
        { name: "Toph, the First Metalbender", setCode: "TLA" },
        { name: "Minimus Containment", setCode: "AFR" },
    ],
    setup: [
        "You control [Toph, the First Metalbender]",
        "Your casts [Minimus Containment] targeting [Toph]",
    ],
    question: "What happens?",
    answer: "[Toph] becomes enchanted by [Minimus Containment]. [Minimus Containment] is then put into the graveyard.",
    explanation: [
        "The layer that applies changes to the type of cards is applied before the layer that removes the abilities of cards.",
        "The [Minimus Containment] is changing the type of [Toph] to artifact.",
    ]
};

export default puzzle;
