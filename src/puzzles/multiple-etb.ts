import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    complexity: 1,
    title: "Multiple ETB Triggers",
    categories: [
        "Triggers",
        "Enters"
    ],
    setup: [
        "You control a [Ganax, Astral Hunter]",
        "You control a [Volcanic Dragon]",
        "You cast [Displace] targeting both creatures",
    ],
    question: "How many treasure tokens are created?",
    answer: "2",
    explanation: [
        "[Ganax](Ganax, Astral Hunter) explicitly triggers for itself.",
        "In the same way [Ganax](Ganax, Astral Hunter) 'sees' itself enter and triggers, it 'sees' any other creatures entering at the same time as it."
    ]
};

export default puzzle;
