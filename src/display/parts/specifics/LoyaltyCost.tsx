import { Box } from "@mui/material";
import { center, sizing } from "../../helpers/styles";

type Props = {
  cost: string;
}

const downShape = "polygon(\
55% 0%, 100% 5%, 94% 20%, 92% 40%, 94% 55%, 98% 70%, 50% 100%,\
2% 70%, 6% 55%, 8% 40%, 6% 20%, 0% 5%, 45% 0%)";

const zeroShape = "polygon(\
55% 5%, 100% 10%, 94% 25%, 92% 50%, 94% 75%, 98% 90%, 55% 95%,\
45% 95%, 2% 90%, 6% 75%, 8% 50%, 6% 25%, 0% 10%, 45% 5%)";

const upShape = "polygon(\
55% 100%, 100% 95%, 94% 80%, 92% 60%, 94% 45%, 98% 30%, 50% 0%,\
2% 30%, 6% 45%, 8% 60%, 6% 80%, 0% 95%, 45% 100%)";

export function LoyaltyCost({ cost }: Props) {
  const costNum = Number(cost.replace("+", "").replace("-", ""));
  const costShape = costNum === 0 ? zeroShape : (costNum > 0 ? upShape : downShape);
  const textOffset = costNum === 0 ? 0.5 : (costNum > 0 ? 1 : -1);

  return (
    <Box
      sx={{
        display: "inline-block",
        height: "1.2em",
        width: "2em",
        filter: "drop-shadow(2px 3px 4px rgba(0, 0, 0, 1))",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          fontSize: "0.7em",
          fontWeight: "bold",
          clipPath: costShape,
          backgroundColor: "white",
          boxSizing: "border-box",
          ...center(),
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            p: 0.5,
            pt: textOffset,
            boxSizing: "border-box",
            ...center(),
            ...sizing(85, 85),
            clipPath: costShape,
          }}
        >
          {cost}
        </Box>
      </Box>
    </Box>
  );
}
