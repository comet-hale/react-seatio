import { createMuiTheme } from '@material-ui/core/styles';

import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';

const theme = {
  palette: {
    primary: cyan,
    secondary: {
      main: pink.A200,
    },
    error: red,
    charts: {
      background: '#ffffff',
    },
  },
  status: {
    loginTextField: teal['400'],
    loginButton: teal['400'],
    loginButtonHovered: teal['500'],
    loginButtonLabel: '#ffffff',
    loginLinearProgress: teal.A400,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 2,
      },
      raisedPrimary: {
        color: '#ffffff',
      },
    },
    MuiTypography: {
      display4: {
        color: '#ffffff',
      },
      display3: {
        color: '#ffffff',
      },
      display2: {
        color: '#ffffff',
      },
      display1: {
        color: '#ffffff',
      },
    },
    // NOTE: Popover, Menu & MenuItem components must be light for both dark and light themes
    // Below colors are from default light theme
    MuiPopover: {
      paper: {
        backgroundColor: '#ffffff',
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#ffffff',
        // NOTE: We need this because of bug in native app with dropdowns scrolling.
        // https://developers.google.com/web/updates/2017/11/overscroll-behavior
        overscrollBehaviorY: 'contain',
      },
    },
    MuiMenuItem: {
      root: {
        color: 'rgba(0, 0, 0, 0.87)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
        },
        '&$selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.14) !important',
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
};

export const lightTheme = createMuiTheme(theme);

export const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    charts: {
      background: '#2a2e2e',
    },
    type: 'dark',
  },
});
