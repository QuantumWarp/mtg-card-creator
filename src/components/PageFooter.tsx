import { DarkMode, HelpOutline, LightMode } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Tooltip, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import { useState } from "react";

export function PageFooter() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, setMode, systemMode } = useColorScheme();
  const color = mode === "system" ? systemMode : mode;
  const year = new Date().getFullYear();
  const [openAbout, setOpenAbout] = useState(false);

  const updateMode = () => {
    const nextColor = color !== 'dark' ? 'dark' : 'light';
    const nextMode = (prefersDarkMode && nextColor === "dark") ? "system" : nextColor;
    setMode(nextMode);
  };

  return (
    <Box p={2} display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="center" mb={1}>
        <Tooltip title="About this app" placement="top">
          <IconButton onClick={() => setOpenAbout(true)}>
            <HelpOutline />
          </IconButton>
        </Tooltip>

        <Tooltip title={color !== 'dark' ? "Dark mode" : "Light mode"} placement="top">
          <IconButton onClick={updateMode}>
            {color === 'dark' && <LightMode />}
            {color !== 'dark' && <DarkMode />}
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={openAbout}>
        <DialogTitle>About the eBook Library</DialogTitle>

        <DialogContent>
          <Typography mb={2}>
            Todo
          </Typography>
          <Typography>
            To see more technical information about this app check the README.md of
            the <Link href="https://github.com/QuantumWarp/ebook-library">Github repo</Link>.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAbout(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="body2">
        Copyright © {year}
      </Typography>
    </Box>
  );
}