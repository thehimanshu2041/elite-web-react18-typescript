import { useMemo } from 'react';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import useSettings from '../hooks/use-setting';
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shadows, { customShadows } from './shadows';

interface ThemeConfigProps {
  children?: React.ReactNode;
}

const ThemeConfig: React.FC<ThemeConfigProps> = ({ children }) => {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions: any = useMemo(
    () => ({
      components: {
        MuiFormControl: {
          defaultProps: {
            variant: 'outlined',
          },
        },
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
          },
        },
        MuiSelect: {
          defaultProps: {
            variant: 'outlined',
          },
        },
      },
      palette: isLight
        ? { ...palette.light, mode: 'light' }
        : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,

    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
