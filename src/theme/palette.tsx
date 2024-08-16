import { createTheme, ThemeOptions } from '@mui/material/styles';
import { alpha } from '@mui/system';

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string): string {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// Define types for palette colors
interface ColorPalette {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
}

interface GrayColors {
    [key: string]: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
    main: string;
    contrastText: string;
}

interface Palette {
    common: {
        black: string;
        white: string;
    };
    primary: ColorPalette;
    secondary: ColorPalette;
    info: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
    gray: GrayColors;
    blue: {
        light: string;
        main: string;
        contrastText: string;
    };
    gradients: {
        primary: string;
        info: string;
        success: string;
        warning: string;
        error: string;
    };
    chart: {
        violet: string[];
        blue: string[];
        green: string[];
        yellow: string[];
        red: string[];
    };
    divider: string;
    action: {
        hover: string;
        selected: string;
        disabled: string;
        disabledBackground: string;
        focus: string;
        hoverOpacity: number;
        disabledOpacity: number;
    };
}

// SETUP COLORS
const GRAY: GrayColors = {
    0: '#FAFAFA',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
    main: '#919EAB',
    contrastText: '#FAFAFA'
};

const PRIMARY: ColorPalette = {
    lighter: '#8ba4e0',
    light: '#5d83de',
    main: '#293040',
    dark: '#273b69',
    darker: '#192b54',
    contrastText: '#FFFFFF'
};

const SECONDARY: ColorPalette = {
    lighter: '#dd864e',
    light: '#e09260',
    main: '#DD864E',
    dark: '#c27645',
    darker: '#b86a37',
    contrastText: '#FFFFFF'
};

const INFO: ColorPalette = {
    lighter: '#8aa5e3',
    light: '#74CAFF',
    main: '#3b70eb',
    dark: '#214cb0',
    darker: '#0c255e',
    contrastText: '#FFFFFF'
};

const SUCCESS: ColorPalette = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GRAY[800]
};

const WARNING: ColorPalette = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GRAY[800]
};

const ERROR: ColorPalette = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#FFFFFF'
};

const BLUE = {
    light: '#324673',
    main: '#293040',
    contrastText: '#FFFFFF'
};

const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main)
};

const CHART_COLORS = {
    violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
    blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
    yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
    red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4']
};

const COMMON: Palette = {
    common: { black: '#000', white: '#FAFAFA' },
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    gray: GRAY,
    blue: BLUE,
    gradients: GRADIENTS,
    chart: CHART_COLORS,
    divider: GRAY[500_24],
    action: {
        hover: GRAY[500_8],
        selected: GRAY[500_16],
        disabled: GRAY[500_80],
        disabledBackground: GRAY[500_24],
        focus: GRAY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
};

const lightPalette: ThemeOptions['palette'] = {
    ...COMMON,
    mode: 'light',
    text: { primary: GRAY[800], secondary: GRAY[600], disabled: GRAY[500] },
    background: { paper: '#FAFAFA', default: '#FAFAFA' },
    action: { active: GRAY[600], ...COMMON.action }
};

const darkPalette: ThemeOptions['palette'] = {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#FAFAFA', secondary: GRAY[500], disabled: GRAY[600] },
    background: { paper: GRAY[800], default: GRAY[900] },
    action: { active: GRAY[500], ...COMMON.action }
};

const palette = createTheme({
    light: lightPalette,
    dark: darkPalette
} as any) as any;

export default palette;
