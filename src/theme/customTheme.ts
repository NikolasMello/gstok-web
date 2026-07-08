import { createTheme } from '@mui/material/styles'
import { pink, grey } from '@mui/material/colors'

// Fontes — instale via npm (recomendado, evita FOUC e depender de CDN externo):
// npm install @fontsource/nunito @fontsource/poppins
// E importe os pesos usados no seu main.tsx:
// import '@fontsource/nunito/400.css'
// import '@fontsource/nunito/500.css'
// import '@fontsource/nunito/600.css'
// import '@fontsource/nunito/700.css'
// import '@fontsource/nunito/800.css'
// import '@fontsource/poppins/600.css'
// import '@fontsource/poppins/700.css'
// import '@fontsource/poppins/800.css'

const heading = '"Poppins", "Nunito", sans-serif'

export const customTheme = createTheme({
  // cssVariables habilita troca de tema sem re-render e suporte a
  // prefers-color-scheme automaticamente via atributo data-mui-color-scheme.
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },

  // Define os dois esquemas de cor no MESMO tema — essa é a abordagem
  // moderna do MUI (v6+) em vez de criar dois createTheme() separados.
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: pink[300],
          main: pink[500],
          dark: pink[700],
          contrastText: '#ffffff',
        },
        secondary: {
          light: pink[50],
          main: pink[100],
          dark: pink[200],
          contrastText: pink[900],
        },
        background: {
          default: '#FFFBFC',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#2D2A32',
          secondary: '#6B6470',
        },
        divider: pink[50],
        TableCell: {
          border: pink[50],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: pink[200],
          main: pink[300],
          dark: pink[500],
          contrastText: '#1A1117',
        },
        secondary: {
          light: '#3A2A33',
          main: '#4A2E3A',
          dark: '#5C3645',
          contrastText: pink[100],
        },
        background: {
          // Não usar preto puro: fundo levemente colorido (combina com a
          // identidade pink) reduz fadiga visual comparado a #000.
          default: '#19151A',
          paper: '#221C24',
        },
        text: {
          primary: '#F3EDF0',
          secondary: '#B8AEB5',
        },
        divider: '#322A30',
        TableCell: {
          border: '#322A30',
        },
      },
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',

    h1: { fontFamily: heading, fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontFamily: heading, fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: heading, fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontFamily: heading, fontWeight: 600 },
    h5: { fontFamily: heading, fontWeight: 600 },
    h6: { fontFamily: heading, fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 700,
      textTransform: 'none',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${pink[300]} ${pink[50]}`,
          // Dark mode usa seletor de atributo, já que a paleta agora
          // depende do colorScheme ativo, não de um if estático.
          '[data-mui-color-scheme="dark"] &': {
            scrollbarColor: `${pink[700]} ${grey[900]}`,
          },
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999, // pill shape, bem "friendly"
          paddingInline: 20,
          paddingBlock: 10,
        },
        sizeSmall: {
          paddingInline: 14,
          paddingBlock: 6,
        },
        sizeLarge: {
          paddingInline: 28,
          paddingBlock: 12,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 20,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: 20,
          border: `1px solid ${t.vars.palette.divider}`,
        }),
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 8,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: 12,
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        list: {
          padding: 12,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})
