import { Box } from "@mui/material";
import { CardSymbol } from "./CardSymbol";

export function ManaCost({ manaCost }: { manaCost: string }) {
  if (!manaCost) return;

  const split = manaCost.split(/(\{.*?\})/);

  return (
    <Box>
      {split.map((x, index) => {
        if (x.length === 0) return undefined;
        if (!/^\{.*?\}$/.test(x)) return <span key={x}>{x}</span>;
        return (
          <Box display="inline-block" key={index + x}>
            <CardSymbol encoded={x} />
          </Box>
        );
      })}
    </Box>
  );
}
