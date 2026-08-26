import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { sizing } from '../../helpers/styles';

type Props = {
  children: ReactNode;
  texture: ReactNode;
}

export function BaseBackground({ children, texture }: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "black",
        fontFamily: "Matrix, Garamond, serif",
        borderRadius: ".6em",
        aspectRatio: 0.715,
        color: "black",
      }}
    >
      {texture}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...sizing(100, 100),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
