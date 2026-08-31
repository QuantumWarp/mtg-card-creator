import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "multiple-etb",
    complexity: 1,
    categories: [
        "Triggers",
        "Enters"
    ],
    cards: [
        { name: "Ganax, Astral Hunter", setCode: "CLB" },
        { name: "Volcanic Dragon", setCode: "M20" },
        { name: "Displace", setCode: "EMN" },
    ],
    setup: [
        "You control a [Ganax, Astral Hunter]",
        "You control a [Volcanic Dragon]",
        "You cast [Displace] targeting both creatures",
    ],
    question: "How many treasure tokens are created?",
    answer: "2",
    explanation: [
        "[Ganax] explicitly triggers for itself.",
        "In the same way [Ganax] 'sees' itself enter and triggers, it 'sees' any other creatures entering at the same time as it."
    ]
};

export default puzzle;
