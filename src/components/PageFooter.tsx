import { DarkMode, HelpOutlined, LightMode, CancelPresentation, Download, Upload, ToggleOff, ToggleOn, Delete, Settings } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import { backup, deleteAllData, restore } from "../storage/backup-restore";
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
  const restoreInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState<HTMLElement>();
  const [openAbout, setOpenAbout] = useState(false);
  const [openClearCache, setOpenClearCache] = useState(false);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [examplesToggle, setExamplesToggle] = useState(examplesEnabled());

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
      <Menu
        open={!!menuOpen}
        anchorEl={menuOpen}
        sx={{ mb: 1 }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        transformOrigin={{ horizontal: "center", vertical: "bottom" }}
        onClose={() => setMenuOpen(undefined)}
      >
        
        <MenuItem onClick={() => setOpenAbout(true)}>
          <HelpOutlined sx={{ mr: 1 }} />
          About this app
        </MenuItem>
        
        <MenuItem onClick={() => {
          backup();
          setMenuOpen(undefined);
        }}>
          <Download sx={{ mr: 1 }} />
          Backup all data
        </MenuItem>

        <MenuItem onClick={() => restoreInputRef.current?.click()}>
          <Upload sx={{ mr: 1 }} />
          <input
            ref={restoreInputRef}
            style={{ display: "none" }}
            accept="application/json"
            type="file"
            onChange={async (event) => {
              const selectedFile = event.target.files?.[0];
              if (!selectedFile) return;
              await restore(selectedFile, navigate);
              reload?.();
              setMenuOpen(undefined);
            }}
          />
          Restore from backup
        </MenuItem>
        
        <MenuItem onClick={() => {
          toggleExamples();
          setExamplesToggle(!examplesToggle);
          reload?.()
        }}>
          {examplesToggle && <ToggleOn sx={{ mr: 1 }} />}
          {!examplesToggle && <ToggleOff sx={{ mr: 1 }} />}
          Examples {examplesToggle ? "on" : "off"}
        </MenuItem>

        <MenuItem onClick={updateMode}>
          {color !== 'dark' && <LightMode sx={{ mr: 1 }} />}
          {color === 'dark' && <DarkMode sx={{ mr: 1 }} />}
          {color === 'dark' ? "Dark mode" : "Light mode"}
        </MenuItem>
        
        <MenuItem onClick={() => setOpenClearCache(true)}>
          <CancelPresentation sx={{ mr: 1 }} />
          Clear Scryfall cache
        </MenuItem>
        
        <MenuItem onClick={() => setOpenDeleteAll(true)}>
          <Delete sx={{ mr: 1 }} />
          Delete all data
        </MenuItem>
      </Menu>

      <Box>
        <Tooltip title="Settings" placement="top">
          <IconButton onClick={(e) => setMenuOpen(e.currentTarget)}>
            <Settings />
          </IconButton>
        </Tooltip>
      </Box>

      <ConfirmationDialog
        title="Delete all data"
        action="Delete"
        open={openDeleteAll}
        onConfirm={() => {
          deleteAllData();
          reload?.();
          setMenuOpen(undefined);
        }}
        onClose={() => setOpenDeleteAll(false)}
      >
        Are you sure you want to delete <b>ALL</b> data?
        Please consider backing up first.
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Clear Scryfall cache"
        action="Clear"
        open={openClearCache}
        onConfirm={() => {
          clearScryfallCache();
          setMenuOpen(undefined);
        }}
        onClose={() => setOpenClearCache(false)}
      >
        Are you sure you want to clear the Scryfall cache?
        You should only need to do this to get the very latest updates
        and errata from Scryfall.
      </ConfirmationDialog>

      <AboutDialog open={openAbout} onClose={() => { 
        setMenuOpen(undefined);
        setOpenAbout(false);
      }} />

      <Typography variant="body2">
        Copyright © {year}
      </Typography>
    </Box>
  );
}