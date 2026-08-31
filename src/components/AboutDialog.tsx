import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Link } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
}

export function AboutDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open}>
      <DialogTitle>About</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Initially designed for creating cards using only CSS,
          this unofficial tool lets you design custom MTG cards or browse real cards in the same layout.
          Remember to credit any artwork used in your custom creations. The puzzle section
          was added later as a fun way to learn about various Magic: The Gathering rules and interactions!
        </Typography>

        <Typography sx={{ mb: 2 }}>
          MTG Card Creator is unofficial Fan Content permitted under the Fan Content Policy.
          Not approved/endorsed by Wizards.
          Portions of the materials used are property of Wizards of the Coast.
          ©Wizards of the Coast LLC.
        </Typography>

        <Typography>
          To see more technical information about this app check out
          the <Link href="https://github.com/QuantumWarp/mtg-card-creator">Github repo</Link>.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}