import { Box } from "@mui/material";
import { useSymbol } from "../../../scryfall/use-symbol";

type Props = {
  encoded: string;
  size?: string;
  noShadow?: boolean;
}

export function CardSymbol({ encoded, size = "1em", noShadow = false }: Props) {
  const symbol = useSymbol(encoded);

  if (!symbol) return encoded;

  return (
    <Box sx={{ ml: "0.1em", mt: "0.2em" }}>
      <img
        src={symbol.svgUri}
        style={{
          filter: noShadow ? "" : "drop-shadow(-0.04em 0.12em 0px #000)",
          width: size
        }}
      />
    </Box>
  );
}
