import { Box } from "@mui/material";
import { useSymbol } from "../../scryfall/use-symbol";

type CardSymbolProps = {
  encoded: string;
  size?: number;
  noShadow?: boolean;
}

export function CardSymbol({ encoded, size = 24, noShadow = false }: CardSymbolProps) {
  const symbol = useSymbol(encoded);

  if (!symbol) return encoded;

  return (
    <Box ml={0.3} mt={0.6}>
      <img
        src={symbol.svgUri}
        width={size}
        height={size}
        style={{ filter: noShadow ? "" : "drop-shadow(-1px 2px 0px #000)" }}
      />
    </Box>
  );
}
