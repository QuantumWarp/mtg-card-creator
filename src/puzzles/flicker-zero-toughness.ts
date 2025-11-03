import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    complexity: 3,
    title: "Flicker Zero Toughness",
    categories: [
        "Flicker",
        "State-Based Actions"
    ],
    setup: [
        "You control a [Benalish Marshal]",
        "You control a [Mikaeus, the Lunarch] with no +1/+1 counters on it",
        "You cast [Cloudshift] targeting [Benalish Marshal]",
    ],
    question: "Will [Mikaeus](Mikaeus, the Lunarch) survive this?",
    answer: "Yes",
    explanation: [
        "Although [Mikaeus](Mikaeus, the Lunarch) does briefly have 0 toughness when [Benalish Marshal] leaves the battlefield, " +
        "state-based actions are not checked until after the spell resolves.",
        "State-based actions include checking for creatures with 0 or less toughness to be put into the graveyard."
    ]
};

export default puzzle;
