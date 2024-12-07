import { Box } from "@mui/material";
import { CardSymbol } from "./CardSymbol";

type TextParserProps = {
  text?: string;
}

export function TextParser({ text }: TextParserProps) {
  if (!text) return;

  const split = text.split(/(\{.*?\})/);

  return (
    <Box>
      {split.map((x, index) => {
        if (x.length === 0) return undefined;
        if (!/^\{.*?\}$/.test(x)) return <span key={x}>{x}</span>;
        return (
          <Box display="inline-block" key={index + x}>
            <CardSymbol encoded={x} size={19} noShadow />
          </Box>
        );
      })}
    </Box>
  );
}
