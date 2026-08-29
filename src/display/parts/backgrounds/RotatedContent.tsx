import { ReactNode } from 'react';
import { sizing } from '../../helpers/styles';
import { Box, SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  sx?: SxProps;
}

export function RotatedContent({ children, sx }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        position: (sx as any)?.position || "relative",
        ...sizing(100, 100)
      }}
    >
      <Box
        sx={{
          position: "relative",
          transform: "rotate(-90deg)",
          ...sizing(100, 100),
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ...sizing(132, 72),
            ...sx,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
