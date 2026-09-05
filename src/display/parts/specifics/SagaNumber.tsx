import { Box } from "@mui/material";
import { center, sizing } from "../../helpers/styles";
import { palettes } from "../../helpers/palette";

type Props = {
  text: string;
}

const hexShape = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

export function SagaNumber({ text }: Props) {
  const content = text.split(" ")[0];
  return (
    <Box
      sx={{
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        filter: "drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.4))",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          fontSize: "0.7em",
          fontWeight: "bold",
          clipPath: hexShape,
          backgroundColor: palettes.Multicolor.dark,
          boxSizing: "border-box",
          ...center(),
        }}
      >
        <Box
          sx={{
            backgroundColor: palettes.Multicolor.mid,
            color: "black",
            p: 0.5,
            boxSizing: "border-box",
            ...center(),
            ...sizing(85, 85),
            clipPath: hexShape,
          }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
}
