import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  const theme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          background: {
            default: '#f0f0f0',
          },
        },
      },
      dark: {
        palette: {
          background: {
            default: '#1b1b1b',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
