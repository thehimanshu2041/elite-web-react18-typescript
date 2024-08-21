import { createContext, ReactNode, FC } from 'react';
import UseLocalStorage from '../../hooks/use-local-storage';
import palette from '../../theme/palette';

interface ColorOption {
    name: string;
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
}

const PRIMARY_COLOR: ColorOption[] = [
    {
        name: 'default',
        ...palette.light.primary
    },
    {
        name: 'purple',
        lighter: '#EBD6FD',
        light: '#B985F4',
        main: '#7635dc',
        dark: '#431A9E',
        darker: '#200A69',
        contrastText: '#FAFAFA'
    },
    {
        name: 'cyan',
        lighter: '#D1FFFC',
        light: '#76F2FF',
        main: '#1CCAFF',
        dark: '#0E77B7',
        darker: '#053D7A',
        contrastText: palette.light.gray[800]
    },
    {
        name: 'blue',
        lighter: '#CCDFFF',
        light: '#6697FF',
        main: '#0045FF',
        dark: '#0027B7',
        darker: '#00137A',
        contrastText: '#FAFAFA'
    },
    {
        name: 'orange',
        lighter: '#FEF4D4',
        light: '#FED680',
        main: '#fda92d',
        dark: '#B66816',
        darker: '#793908',
        contrastText: palette.light.gray[800]
    },
    {
        name: 'red',
        lighter: '#FFE3D5',
        light: '#FFC1AC',
        main: '#FF3030',
        dark: '#B71833',
        darker: '#7A0930',
        contrastText: '#FAFAFA'
    }
];

type ThemeColor = 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red';

function SetColor(themeColor: ThemeColor): ColorOption {
    const DEFAULT = PRIMARY_COLOR[0];
    const PURPLE = PRIMARY_COLOR[1];
    const CYAN = PRIMARY_COLOR[2];
    const BLUE = PRIMARY_COLOR[3];
    const ORANGE = PRIMARY_COLOR[4];
    const RED = PRIMARY_COLOR[5];

    switch (themeColor) {
        case 'purple':
            return PURPLE;
        case 'cyan':
            return CYAN;
        case 'blue':
            return BLUE;
        case 'orange':
            return ORANGE;
        case 'red':
            return RED;
        default:
            return DEFAULT;
    }
}

interface SettingsContextType {
    themeMode: 'light' | 'dark';
    themeDirection: 'ltr' | 'rtl';
    themeColor: ThemeColor;
    themeStretch: boolean;
    onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleStretch: () => void;
    setColor: ColorOption;
    colorOption: { name: string; value: string }[];
}

const initialState: SettingsContextType = {
    themeMode: 'light',
    themeDirection: 'ltr',
    themeColor: 'default',
    themeStretch: false,
    onChangeMode: () => { },
    onChangeDirection: () => { },
    onChangeColor: () => { },
    onToggleStretch: () => { },
    setColor: PRIMARY_COLOR[0],
    colorOption: []
};

const settingsContext = createContext<SettingsContextType>(initialState);

interface SettingsProviderProps {
    children: ReactNode;
}

const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = UseLocalStorage('settings', {
        themeMode: initialState.themeMode,
        themeDirection: initialState.themeDirection,
        themeColor: initialState.themeColor,
        themeStretch: initialState.themeStretch
    });

    const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
            ...settings,
            themeMode: event.target.value as any
        });
    };

    const onChangeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
            ...settings,
            themeDirection: event.target.value as any
        });
    };

    const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
            ...settings,
            themeColor: event.target.value as any
        });
    };

    const onToggleStretch = () => {
        setSettings({
            ...settings,
            themeStretch: !settings.themeStretch
        });
    };

    return (
        <settingsContext.Provider
            value={{
                ...settings,
                onChangeMode,
                onChangeDirection,
                onChangeColor,
                setColor: SetColor(settings.themeColor),
                colorOption: PRIMARY_COLOR.map((color) => ({
                    name: color.name,
                    value: color.main
                })),
                onToggleStretch
            }}
        >
            {children}
        </settingsContext.Provider>
    );
};

export { SettingsProvider, settingsContext };
