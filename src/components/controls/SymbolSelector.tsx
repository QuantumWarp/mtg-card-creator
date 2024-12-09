import { Box, ButtonBase, Popover } from "@mui/material";
import { useSymbology } from "../../scryfall/use-symbology";
import { CardSymbol } from "../../display/symbols/CardSymbol";

type SymbolSelector = {
  manaOnly?: boolean;
  omit?: string[];
  anchorEl?: HTMLElement;
  onSelect: (encoded: string) => void;
  onClose: () => void;
}

export function SymbolSelector({
  manaOnly,
  omit,
  anchorEl,
  onSelect,
  onClose
}: SymbolSelector) {
  const symbology = useSymbology();
  let filteredSymbols = manaOnly ? symbology?.filter((x) => x.manaCost) : symbology;
  filteredSymbols = omit ? filteredSymbols?.filter((x) => !omit.includes(x.symbol)) : filteredSymbols;

  const symbolButton = (encoded: string) => (
    <ButtonBase key={encoded} sx={{ p: 0.4 }} onClick={() => { onSelect(encoded); onClose(); }}>
      <CardSymbol encoded={encoded} size="30px" noShadow />
    </ButtonBase>
  );

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      
    >
      <Box p={1} width={410}>
        {filteredSymbols?.map((x) => symbolButton(x.symbol))}
      </Box>
    </Popover>
  )
}
