import { Box } from "@mui/material";
import { Symbol } from "./Symbol";

export function ManaCost({ manaCost }: { manaCost: string }) {
  if (!manaCost) return;

  const split = manaCost.split(/[{}]/);

  return (
    <Box>
      {split.map((x, index) => {
        if (x.length === 0) return undefined;
        if (x.length > 1 || x === ".") return <span key={x}>{x}</span>;
        return (
          <Box display="inline-block" key={index + x}>
            <Symbol encoded={`{${x}}`} />
          </Box>
        );
      })}
    </Box>
  );
}
