import { Puzzle } from "./core/puzzle";

const puzzle: Puzzle = {
    complexity: 3,
    title: "Trigger Order",
    categories: [
        "Triggers",
        "Priority"
    ],
    setup: [
        "You have 1 life remaining",
        "You control an [Ajani's Mantra]",
        "Your opponent controls a [Persistent Constrictor]",
        "Your have just entered your upkeep",
    ],
    question: "Will you lose the game?",
    answer: "Yes",
    explanation: [
        "Triggers are put on the stack in order of priority.",
        "As it is your upkeep, you have priority first, so your [Ajani's Mantra] trigger goes on the stack first.",
        "Then your opponent's [Persistent Constrictor] trigger goes on the stack on top of it.",
        "The topmost trigger resolves first, so the [Persistent Constrictor] trigger resolves first, causing you to lose 1 life.",
        "You go to 0 life and lose the game before your [Ajani's Mantra] trigger can resolve.",
        "Note: State-based actions (such as checking if a player is at 0 life) are checked whenever a player would receive priority. " + 
        "This includes after each trigger resolves."
    ]
};

export default puzzle;
