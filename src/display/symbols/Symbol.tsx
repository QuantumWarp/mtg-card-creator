import { Box } from "@mui/material";
import { useSymbol } from "../../scryfall/use-symbol";

type SymbolProps = {
  encoded: string;
  size?: number;
  noShadow?: boolean;
}

export function Symbol({ encoded, size = 24, noShadow = false }: SymbolProps) {
  const imgData = useSymbol(encoded);

  if (!imgData) return encoded;

  return (
    <Box ml={0.3} mt={0.6}>
      <img
        src={imgData}
        width={size}
        height={size}
        style={{ filter: noShadow ? "" : "drop-shadow(-1px 2px 0px #000)" }}
      />
    </Box>
  );
}
