import { Box } from "@mui/material";
import { CardSymbol } from "./CardSymbol";
import { LoyaltyCost } from "../../parts/specifics/LoyaltyCost";
import { SagaNumber } from "../../parts/specifics/SagaNumber";

type Props = {
  text?: string;
}

export function TextParser({ text: fullText }: Props) {
  if (!fullText) return;

  const blocks = fullText.split("\n").filter(x => !!x);

  function renderBlock(text: string, index: number) {
    const segments = text.split(/(\(.*?\)|^.*—)/g).filter(x => !!x);
    const isOption = text.startsWith("•");

    return (
      <Box key={index} sx={{
        mt: index === 0 ? 0 : (isOption ? "0.2em" : "0.6em"),
        ml: isOption ? "0.4em" : 0,
      }}>
        {segments.map((segment) => renderSegment(segment))}
      </Box>
    );
  }

  function renderSegment(text: string) {
    const parts = text.split(/([+−-]?[X\d]+:)|(\{.*?\})/g).filter(x => !!x);
    const italic = text.startsWith("(") || (text.endsWith("—") && !text.includes("choose"));
    return (
      <Box key={text} component="span" sx={{ fontStyle: italic ? "italic" : "inherit" }}>
        {parts.map((part, partIndex) => renderPart(part, partIndex))}
      </Box>
    );
  }

  function renderPart(text: string, index: number) {
    if (/^\{.*?\}$/.test(text)) return (
      <Box key={index + text} sx={{ display: "inline-block", marginTop: -1 }}>
        <CardSymbol encoded={text} size="0.8em" noShadow />
      </Box>
    );

    if (/^[+−-]?[X\d]+:$/.test(text)) return (
      <Box key={index + text} sx={{ display: "inline-block", mb: -0.8 }}>
        <LoyaltyCost cost={text.replace(":", "")} />:
      </Box>
    );
  
    const sagaRegex = /^((?:(?:I|II|III|IV|V|VI|VII|VIII|IX|X)+,?\s)+)([—-])(.*)$/i;
    if (sagaRegex.test(text)) {
      const match = text.match(sagaRegex);
      const numerals = match ? match[1].split(',').map(n => n.trim()) : [];
      const dash = match ? match[2].trim() : "";
      const rest = match ? match[3].trim() : text;
      return (
        <Box key={index + text} sx={{ display: "inline-block", mb: -1 }}>
          {numerals.map((x, index) => <>
            <SagaNumber text={x} />
            {index !== numerals.length - 1 && <Box sx={{ display: "inline-block", ml: ".1em", mr: ".2em" }}>,</Box>}
          </>)} {dash} {rest}
        </Box>
      );
    } 

    return (
      <span key={index + text} style={{ marginTop: index === 0 ? 0 : "0.5em" }}>
        {text}
      </span>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </Box>
  );
}
