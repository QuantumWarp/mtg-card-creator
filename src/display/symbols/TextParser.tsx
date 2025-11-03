import { Box } from "@mui/material";
import { CardSymbol } from "./CardSymbol";

type TextParserProps = {
  text?: string;
}

export function TextParser({ text: fullText }: TextParserProps) {
  if (!fullText) return;

  const blocks = fullText.split("\n").filter(x => !!x);

  function renderBlock(text: string, index: number) {
    const segments = text.split(/(\(.*?\)|^.*—)/g).filter(x => !!x);

    return (
      <Box key={index} mt={index === 0 ? 0 : "0.6em"}>
        {segments.map((segment) => renderSegment(segment))}
      </Box>
    );
  }

  function renderSegment(text: string) {
    const parts = text.split(/(\{.*?\})/g).filter(x => !!x);
    const italic = text.startsWith("(") || text.endsWith("—");
    return (
      <Box key={text} component="span" fontStyle={italic ? "italic" : "inherit"}>
        {parts.map((part, partIndex) => renderPart(part, partIndex))}
      </Box>
    );
  }

  function renderPart(text: string, index: number) {
    if (!/^\{.*?\}$/.test(text)) return (
      <span key={index + text} style={{ marginTop: index === 0 ? 0 : "0.5em" }}>
        {text}
      </span>
    );

    return (
      <Box display="inline-block" key={index + text} marginTop={-1}>
        <CardSymbol encoded={text} size="0.8em" noShadow />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      {blocks.map((block, index) => renderBlock(block, index))}
    </Box>
  );
}
