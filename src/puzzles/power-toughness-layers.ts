import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "power-toughness-layers",
    complexity: 3,
    categories: [
        "Layers",
        "Power/Toughness"
    ],
    cards: [
        { name: "Amphin Cutthroat", setCode: "M12" },
        { name: "Twisted Image", setCode: "SOM" },
        { name: "Aether Tunnel", setCode: "M19" },
        { name: "Turn to Frog", setCode: "M15" },
    ],
    setup: [
        "You control a [Amphin Cutthroat]",
        "You cast [Twisted Image] targeting it and it resolves",
        "You cast [Aether Tunnel] targeting it and it resolves",
        "You attack",
        "Your opponent casts [Turn to Frog] targeting your [Amphin Cutthroat]",
    ],
    question: "How much combat damage will you deal?",
    answer: "1",
    explanation: [
        "Effects that modify power and toughness are applied in a specific order",
        "First, effects that set the power and toughness to a value ([Turn to Frog])",
        "Next, effects that modify but don't set the power and toughness ([Aether Tunnel])",
        "Finally, effects that switch power and toughness ([Twisted Image])",
    ]
};

export default puzzle;
