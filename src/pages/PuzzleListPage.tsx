import { Box, Button, Card, CardActionArea, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useNavigate } from "react-router-dom";
import { puzzleList } from "../puzzles/core/puzzle-list";
import { complexityColorMap } from "../puzzles/core/puzzle.helper";
import { Check, Visibility } from "@mui/icons-material";
import { getCompletedPuzzles } from "../storage/puzzle.storage";

export function PuzzleListPage() {
  const navigate = useNavigate();
  const completedPuzzles = getCompletedPuzzles();

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" >
        <Typography variant="h3">
          Puzzles 🧩
        </Typography>

        <Grid2 container spacing={1}>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
          >Back</Button>
        </Grid2>
      </Box>
      
      <Typography my={4}>
        These puzzles are intended to be a learning tool to help with understanding various Magic: The Gathering rules and interactions.
        Often the solution will depend on a particular piece of rules knowledge that you will either already know or not. Expect to learn
        new rules rather than be challenged on existing knowledge!
      </Typography>

      <Grid2 container spacing={1} display="flex" flexDirection="column" alignItems="center">
        {puzzleList.map((puzzle, index) => (
          <Grid2 key={index} width={600}>
            <Card>
              <CardActionArea onClick={() => navigate(`/puzzles/${index}`)}>
                <Box sx={{ p: 2 }} display="flex" alignItems="center">
                  <Box>
                    {completedPuzzles.includes(puzzle.title)
                      ? <Check sx={{ mr: 2, color: "green" }} />
                      : <Visibility sx={{ mr: 2, color: "gray" }} />}
                  </Box>
                  <Typography variant="h6">
                    Puzzle {index + 1}
                  </Typography>
                  <Typography flex={1} ml={4}>
                    {puzzle.categories.join(", ")}
                  </Typography>
                  <Typography sx={{ color: complexityColorMap[puzzle.complexity] }}>
                    {Array.from({ length: puzzle.complexity }, () => "★").join("")}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      
    </PageContainer>
  );
}
