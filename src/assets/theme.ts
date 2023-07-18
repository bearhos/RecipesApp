export const KUMBHSANS_BLACK = 'KumbhSans-Black';
export const KUMBHSANS_BOLD = 'KumbhSans-Bold';
export const KUMBHSANS_EXTRABOLD = 'KumbhSans-ExtraBold';
export const KUMBHSANS_EXTRALIGHT = 'KumbhSans-ExtraLight';
export const KUMBHSANS_LIGHT = 'KumbhSans-Light';
export const KUMBHSANS_MEDIUM = 'KumbhSans-Medium';
export const KUMBHSANS_REGULAR = 'KumbhSans-Regular';
export const KUMBHSANS_SEMIBOLD = 'KumbhSans-SemiBold';
export const KUMBHSANS_THIN = 'KumbhSans-Thin';
//
export const POPPINS_BLACK = 'Poppins-Black';
export const POPPINS_BOLD = 'Poppins-Bold';
export const POPPINS_MEDIUM = 'Poppins-Medium';

// pallete
export const lightColors = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#000000',
  backgroundButtonPrimary: '#4CA6A8',

  textPrimary: '#000000',
  textSecondary: '#999999',
  textHighlight: '#666666',
  textHighContrast: '#FFFFFF',
  codeUserBackground: '#F1F1F1',
  messageBackground: '#F5F5F5',

  lineProfile: '#A9A9A9 ',
  backgroundReportInput: '#FAFAFA',
  boderAvatarAds: '#737373',
  lineTabButton: '#2F2F2F',

  surface: '#000000',
  onSurface: '#C4C4C4',
  disable: '#CBCBCB',
  messageColor: '#D2D2D2',

  strokeDark: '#333333',
  blue: '#1e3799',
  zoom: '#4087FC',

  iconHighLight: '#FF4D00',
  iconHighLight2: '#FF326F',
  iconNormal: '#FFFFFF',
  iconCloseComment: '#2E3A59',
  iconRecord: '#FF5555',
  iconLogo: '#AAAAAA',

  error: '#FF4D00',
  success: '#25B995',
  warning: '#FFB904',
  description: '#555555',

  trimTint: '#B3B3B3',
  trimMaker: '#515151',

  noted: '#FFE37E',

  transparent: 'transparent',
  weakBorder: '#979797',
};

const button = {
  height: 44,
  borderRadius: 22,
};

export const fonts = {
  kumbhsans: {
    black: KUMBHSANS_BLACK,
    bold: KUMBHSANS_BOLD,
    extraBold: KUMBHSANS_EXTRABOLD,
    extraLight: KUMBHSANS_EXTRALIGHT,
    light: KUMBHSANS_LIGHT,
    medium: KUMBHSANS_MEDIUM,
    regular: KUMBHSANS_REGULAR,
    semiBold: KUMBHSANS_SEMIBOLD,
    thin: KUMBHSANS_THIN,
  },
  poppins: {
    bold: POPPINS_BOLD,
    black: POPPINS_BLACK,
    medium: POPPINS_MEDIUM,
  },
};

export const alpha = {
  alpha_15: '26',
  alpha_10: 'FF',
  alpha_09: 'E6',
  alpha_08: 'CD',
  alpha_07: 'B4',
  alpha_06: '9B',
  alpha_05: '82',
  alpha_04: '69',
  alpha_03: '37',
  alpha_02: '1E',
  alpha_01: '05',
  alpha_005: '0d',
};

export const depthLevel = {
  level_01: 40,
  level_02: 30,
  level_03: 20,
  level_04: 10,
};

const DefaultTheme = {
  roundness: 4,
  colors: lightColors,
  button,
  animation: {
    scale: 1.0,
  },
  contentPadding: 16,
  iconSize: {
    normal: 24,
    small: 16,
    large: 32,
  },
  depthLevel,
  fonts,
  alpha,
};

export default DefaultTheme;
