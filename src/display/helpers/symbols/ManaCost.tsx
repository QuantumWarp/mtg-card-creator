import { Box } from "@mui/material";
import { CardSymbol } from "./CardSymbol";

type Props = {
  manaCost: string | undefined;
}

export function ManaCost({ manaCost }: Props) {
  if (!manaCost) return;

  const split = manaCost.split(/(\{.*?\})/);

  return (
    <Box>
      {split.map((x, index) => {
        if (x.length === 0) return undefined;
        if (!/^\{.*?\}$/.test(x)) return <span key={x}>{x}</span>;
        return (
          <Box key={index + x} sx={{ display: "inline-block" }}>
            <CardSymbol encoded={x} />
          </Box>
        );
      })}
    </Box>
  );
}
