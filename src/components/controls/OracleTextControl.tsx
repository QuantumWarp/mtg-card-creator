import { Button, InputAdornment, TextField } from "@mui/material";
import { SymbolSelector } from "./SymbolSelector";
import { MutableRefObject, useState } from "react";

type OracleTextControlProps = {
  inputRef?: MutableRefObject<HTMLInputElement | undefined>;
  value: string;
  onChange: (value: string) => void;
}

export function OracleTextControl({
  inputRef,
  value,
  onChange
}: OracleTextControlProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  return (
    <TextField
      inputRef={inputRef}
      label="Text"
      fullWidth
      multiline
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={(e) => setAnchorEl(e.currentTarget)} sx={{height: 120 }} tabIndex={-1}>
                Icons
              </Button>
              <SymbolSelector
                anchorEl={anchorEl}
                onSelect={(encoded) => onChange(value + encoded)}
                onClose={() => setAnchorEl(undefined)}
              />
            </InputAdornment>
          ),
        },
      }}
    />

  )
}