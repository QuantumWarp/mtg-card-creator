import { Box } from "@mui/material";

type LoyaltyCostProps = {
  cost: string;
}

export function LoyaltyCost({ cost }: LoyaltyCostProps) {
  return (
    <Box component="span" border="2px solid black">
      {cost}
    </Box>
  );
}
