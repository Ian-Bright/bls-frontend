import { CSSProperties } from 'react';

export type TypographyVariant =
    | 'caption'
    | 'h2'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2';

type TypographyVariantMap = { [key in TypographyVariant]: CSSProperties };

export type BLSTheme = {
    typography: TypographyVariantMap;
};

export const typography: TypographyVariantMap = {
    caption: {
        fontFamily: 'Inconsolata',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '14px',
    },
    h2: {
        fontFamily: 'Inconsolata',
        fontSize: '48px',
        fontWeight: 500,
        letterSpacing: '0.5px',
        lineHeight: 'g6px',
    },
    h4: {
        fontFamily: 'Inconsolata',
        fontSize: '34px',
        fontWeight: 500,
        letterSpacing: '0.5px',
        lineHeight: '40px',
    },
    h5: {
        fontFamily: 'Inconsolata',
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '28px',
    },
    h6: {
        fontFamily: 'Inconsolata',
        fontSize: '20px',
        fontWeight: 500,
        letterSpacing: '0.5px',
        lineHeight: '24px',
    },
    subtitle1: {
        fontFamily: 'Inconsolata',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '18px',
    },
    subtitle2: {
        fontFamily: 'Inconsolata',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
    },
};

export const theme: BLSTheme = {
    typography,
};
