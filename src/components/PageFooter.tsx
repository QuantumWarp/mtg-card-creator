import { DarkMode, HelpOutlined, LightMode, CancelPresentation, Download, Upload, ToggleOff, ToggleOn, Delete } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import { backup, canBackup, deleteAllData, restore } from "../storage/backup-restore";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { examplesEnabled, toggleExamples } from "../examples/load-examples";
import { AboutDialog } from "./AboutDialog";

type Props = {
  reload?: () => void;
}

export function PageFooter({ reload }: Props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const navigate = useNavigate();
  const { mode, setMode, systemMode } = useColorScheme();
  const color = mode === "system" ? systemMode : mode;
  const year = new Date().getFullYear();
  const [openAbout, setOpenAbout] = useState(false);
  const [openClearCache, setOpenClearCache] = useState(false);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [examplesToggle, setExamplesToggle] = useState(examplesEnabled());

  const isRestore = useMemo(() => !canBackup(), []);

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
    <Box sx={{ p: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Box sx={{ mb: 1 }}>
        <Tooltip title="About this app" placement="top">
          <IconButton onClick={() => setOpenAbout(true)}>
            <HelpOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title={examplesToggle ? "Hide Examples" : "Show Examples"} placement="top">
          <IconButton onClick={() => {
            toggleExamples();
            setExamplesToggle(!examplesToggle);
            reload?.()
          }}>
            {examplesToggle && <ToggleOn />}
            {!examplesToggle && <ToggleOff />}
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

        <Tooltip title="Delete all data" placement="top">
          <IconButton component="label" onClick={() => setOpenDeleteAll(true)}>
            <Delete />
          </IconButton>
        </Tooltip>
      
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

      <ConfirmationDialog
        title="Delete all data"
        action="Delete"
        open={openDeleteAll}
        onConfirm={() => deleteAllData()}
        onClose={() => setOpenDeleteAll(false)}
      >
        Are you sure you want to delete <b>ALL</b> data?
        Please consider backing up first.
      </ConfirmationDialog>


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

      <AboutDialog open={openAbout} onClose={() => setOpenAbout(false)} />

      <Typography variant="body2">
        Copyright © {year}
      </Typography>
    </Box>
  );
}