import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "planeswalker-creatures",
    complexity: 3,
    categories: [
        "Planeswalkers",
    ],
    cards: [
        { name: "Sarkhan, the Masterless", setCode: "WAR" },
        { name: "Chandra, Awakened Inferno", setCode: "M20" },
    ],
    setup: [
        "You control [Sarkhan, the Masterless] with 2 Loyalty",
        "You control [Chandra, Awakened Inferno] with 3 Loyalty",
        "You activate [Sarkhan]'s +1 ability",
    ],
    question: "Can you now activate [Chandra]'s -3 ability? If you were able to, what would happen?",
    answer: "Yes. Sarkhan survives. Chandra survives until the end of the turn.",
    explanation: [
        "You can active [Chandra]'s loyalty abilities, as although she is no longer a planeswalker, loyalty abilities are retained",
        "Although [Chandra] will have no loyalty counters on it afterwards, only planeswalkers die from having no loyalty counters. Therefore she will die when she becomes a planeswalker at the end of the turn.",
        "[Sarkhan] is dealt 3 damage by the [Chandra], but as it is also not a planeswalker at this point, damage wont cause it to lose loyalty counters.",
        "Consider what would be different if [Sarkhan]'s ability included 'They are still planeswalkers'"
    ]
};

export default puzzle;
