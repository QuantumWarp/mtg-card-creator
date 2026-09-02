import { ButtonBase, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { CardSymbol } from "../../display/helpers/symbols/CardSymbol";
import { Color } from "../../models/color";


type Props = {
  value: Color[] | undefined;
  onChange: (value: Color[] | undefined) => void;
}

export function ColorControl({
  value,
  onChange
}: Props) {
  const colorFromManaCost = !value;

  const handleSymbolClick = (color: Color) => {
    const isContained = value && value.includes(color);
    if (isContained) onChange(value.filter((x) => x !== color));
    else onChange((value || []).concat(color));
  };

  const symbolButton = (encoded: string) => {
    const color = encoded.replace("{", "").replace("}", "") as Color;
    return (
      <ButtonBase
        sx={{ p: 0.4, opacity: value?.includes(color) ? 1 : 0.5 }}
        onClick={() => handleSymbolClick(color)} tabIndex={-1}
      >
        <CardSymbol encoded={encoded} size="30px" noShadow />
      </ButtonBase>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <FormControlLabel
          label="Color from Mana Cost"
          control={
            <Checkbox
              checked={colorFromManaCost}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) onChange(undefined);
                else onChange([]);
              }}
            />
          }
        />
      </Grid>
      
      <Grid size={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
        {symbolButton("{W}")}
        {symbolButton("{U}")}
        {symbolButton("{B}")}
        {symbolButton("{R}")}
        {symbolButton("{G}")}
      </Grid>
    </Grid>
  )
}