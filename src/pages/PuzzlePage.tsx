import { Box, Button, CircularProgress, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { puzzleList } from "../puzzles/core/puzzle-list";
import { CardDisplay } from "../display/card/CardDisplay";
import { useRealCard } from "../scryfall/use-real-card";
import { getPuzzleCards, renderPuzzleLine } from "../puzzles/core/puzzle.helper";
import { getCompletedPuzzles, markPuzzleCompleted } from "../storage/puzzle.storage";
import { Check } from "@mui/icons-material";

export function KeyedPuzzlePage() {
  const { puzzleIndex } = useParams();
  return <PuzzlePage key={puzzleIndex ?? 'default'} />;
}

function PuzzlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showAnswer, setShowAnswer] = useState(false);

  const { puzzleIndex: puzzleIndexString } = useParams();
  const puzzleIndex = puzzleIndexString ? Number(puzzleIndexString) : 0;
  const puzzle = puzzleList[puzzleIndex];

  const completedPuzzles = getCompletedPuzzles();
  const [completed, setCompleted] = useState(completedPuzzles.includes(puzzle.id));

  const cards = getPuzzleCards(puzzle, showAnswer);

  const [cardName, setCardName] = useState(cards[0]);
  const { card, loading, error } = useRealCard(cardName);

  return (
    <PageContainer key={location.key}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3">
          Puzzle {puzzleIndex + 1}
          {completed && <Check sx={{ ml: 2, width: 38, height: 38, color: "green" }} />}
        </Typography>

        <Grid2 container spacing={1}>
          {puzzleIndex !== puzzleList.length - 1 && (
            <Button
              onClick={() => navigate(`/puzzles/${puzzleIndex + 1}`)}
              variant="outlined"
            >Next Puzzle</Button>
          )}

          <Button
            onClick={() => navigate("/puzzle-list")}
            variant="outlined"
          >Back</Button>
        </Grid2>
      </Box>
      
      <Typography mb={4} fontWeight="bold">
        {puzzle.categories.join(", ")}
      </Typography>

      <Grid2 container spacing={2}>
        <Grid2 display="flex" flexDirection="column" size={{ xs: 12, lg: 6 }} gap={2}>
          <Typography variant="h6" mt={10}>Setup</Typography>
          <ul style={{ marginTop: 0, marginBottom: 0 }}>
            {puzzle.setup.map((line, index) => (
              <li key={index}>
                <Typography>
                  {renderPuzzleLine(line, setCardName)}
                </Typography>
              </li>
            ))}
          </ul>

          <Typography variant="h6" mt={3}>Question</Typography>
          <Typography ml={4} fontWeight="bold" fontSize={24}>
            {renderPuzzleLine(puzzle.question, setCardName, true)}
          </Typography>
    
          
          {!showAnswer &&
            <Box mt={3}>
              <Button
                variant="contained"
                onClick={() => {
                  setShowAnswer(true);
                  markPuzzleCompleted(puzzle.id);
                  setCompleted(true);
                }}
              >
                Reveal Answer
              </Button>
            </Box>
          }

          {showAnswer && (
            <>
              <Typography variant="h6" mt={3}>Answer</Typography>
              <Typography ml={4} fontWeight="bold" fontSize={24}>
                {renderPuzzleLine(puzzle.answer, setCardName, true)}
              </Typography>

              <Typography variant="h6" mt={3}>Explanation</Typography>
              <ul style={{ marginTop: 0, marginBottom: 0 }}>
                {puzzle.explanation.map((line, index) => (
                  <li key={index}>
                    <Typography>
                      {renderPuzzleLine(line, setCardName)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Box display="flex" justifyContent="center" mb={2} gap={2}>
            <Button
              variant="contained"
              onClick={() => {
                const currentCardIndex = cards.indexOf(cardName);
                const previousCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
                setCardName(cards[previousCardIndex]);
              }}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                const currentCardIndex = cards.indexOf(cardName);
                const nextCardIndex = (currentCardIndex + 1) % cards.length;
                setCardName(cards[nextCardIndex]);
              }}
            >
              Next
            </Button>
          </Box>

          <Box display="flex" justifyContent="center">
            {card && <CardDisplay card={card} hideFlavorText />}
            {loading && (
              <Box width="100%" height={500} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box width="100%" height={500} display="flex" alignItems="center" justifyContent="center">
                Error loading card
              </Box>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
