// Define the types for responsive font sizes
interface ResponsiveFontSizes {
    sm: number;
    md: number;
    lg: number;
  }
  
  // Define the type for the typography object
  interface Typography {
    fontFamily: string;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    h5: TypographyStyle;
    h6: TypographyStyle;
    subtitle1: TypographyStyle;
    subtitle2: TypographyStyle;
    body1: TypographyStyle;
    body2: TypographyStyle;
    caption: TypographyStyle;
    overline: TypographyStyle;
    button: TypographyStyle;
  }
  
  // Define the type for a typography style
  interface TypographyStyle {
    fontWeight?: number;
    lineHeight?: number;
    fontSize: string;
    letterSpacing?: number;
    textTransform?: string;
  }
  
  // Define the pxToRem function
  function pxToRem(value: number): string {
    return `${value / 16}rem`;
  }
  
  // Define the responsiveFontSizes function
  function responsiveFontSizes({ sm, md, lg }: ResponsiveFontSizes): { [key: string]: TypographyStyle } {
    return {
      '@media (min-width:600px)': {
        fontSize: pxToRem(sm)
      },
      '@media (min-width:900px)': {
        fontSize: pxToRem(md)
      },
      '@media (min-width:1200px)': {
        fontSize: pxToRem(lg)
      }
    };
  }
  
  // Define the primary font family
  const FONT_PRIMARY = 'Montserrat';
  
  // Define the typography object with type annotations
  const typography: Typography = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
    },
    h2: {
      fontWeight: 700,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
    },
    h6: {
      fontWeight: 700,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16)
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: pxToRem(14)
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(14)
    },
    body2: {
      lineHeight: 22 / 13,
      fontSize: pxToRem(13)
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12)
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      letterSpacing: 1.1,
      textTransform: 'uppercase'
    },
    button: {
      fontWeight: 700,
      lineHeight: 24 / 13,
      fontSize: pxToRem(13),
      textTransform: 'capitalize'
    }
  };
  
  export default typography;
  