import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    id: "trample-deathtouch",
    complexity: 2,
    categories: [
        "Trample",
        "Deathtouch"
    ],
    cards: [
        { name: "Colossal Dreadmaw", setCode: "XLN" },
        { name: "Poison the Blade", setCode: "CLB" },
        { name: "Gigantosaurus", setCode: "M19" },
    ],
    setup: [
        "You attack with a [Colossal Dreadmaw]",
        "Your opponent blocks with a [Gigantosaurus]",
        "You cast [Poison the Blade] targeting your [Colossal Dreadmaw]"
    ],
    question: "What happens?",
    answer: "Both creatures die, and you can deal 5 damage to your opponent",
    explanation: [
        "Deathtouch means that any damage dealt to a creature is considered 'lethal'",
        "Trample says that excess combat damage may be dealt to the player being attacked",
        "Only lethal damage is required to be dealt to each blocking creature before it is considered 'excess'",
        "Therefore only 1 damage (lethal due to deathtouch) is required to be dealt to the [Gigantosaurus] and the rest is considered excess that can be dealt to the opponent being attacked"
    ]
};

export default puzzle;
