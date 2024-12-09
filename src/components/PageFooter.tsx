import { DarkMode, HelpOutline, LightMode, CancelPresentation, Download, Upload } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Tooltip, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import { backup, restore } from "../storage/backup-restore";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "./ConfirmationDialog";

export function PageFooter() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const navigate = useNavigate();
  const { mode, setMode, systemMode } = useColorScheme();
  const color = mode === "system" ? systemMode : mode;
  const year = new Date().getFullYear();
  const [openAbout, setOpenAbout] = useState(false);
  const [openClearCache, setOpenClearCache] = useState(false);

  const isRestore = useMemo(() => {
    const keys = Object.keys(localStorage);
    const cardKeys = keys.filter((x) => x.startsWith("card-"));
    const nonExamples = cardKeys.filter((x) => !x.startsWith("card-example"));
    return nonExamples.length === 0;
  }, []);

  const updateMode = () => {
    const nextColor = color !== 'dark' ? 'dark' : 'light';
    const nextMode = (prefersDarkMode && nextColor === "dark") ? "system" : nextColor;
    setMode(nextMode);
  };

  const clearScryfallCache = () => {
    const keys = Object.keys(localStorage);
    const scryfallKeys = keys.filter((x) => x.startsWith("scryfall-"));
    for (const key of scryfallKeys) {
      localStorage.removeItem(key);
    }
  };

  return (
    <Box p={2} display="flex" alignItems="center" flexDirection="column">
      <Box mb={1}>
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

        <Tooltip title="Clear Scryfall cache" placement="top">
          <IconButton onClick={() => setOpenClearCache(true)}>
            <CancelPresentation />
          </IconButton>
        </Tooltip>

        <ConfirmationDialog
          title="Clear Scryfall cache"
          action="Clear"
          open={openClearCache}
          onConfirm={() => clearScryfallCache()}
          onClose={() => setOpenClearCache(false)}
        >
          Are you sure you want to clear the Scryfall cache?
          You should only need to do this to get the very latest updates
          and errata from Scryfall.
        </ConfirmationDialog>

      
        {!isRestore && (
          <Tooltip title="Backup" placement="top">
            <IconButton onClick={() => backup()}>
              <Download />
            </IconButton>
          </Tooltip>
        )}

        {isRestore && (
          <Tooltip title="Restore from backup" placement="top">
            <IconButton component="label">
              <Upload />
              <input
                style={{ display: "none" }}
                accept="application/json"
                type="file"
                onChange={async (event) => {
                  const selectedFile = event.target.files?.[0];
                  if (!selectedFile) return;
                  restore(selectedFile, navigate);
                }}
              />
            </IconButton>
          </Tooltip>
        )}
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