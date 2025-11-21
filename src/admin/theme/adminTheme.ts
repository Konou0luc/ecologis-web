/**
 * Thème officiel Ecopower pour l'admin
 * Toutes les couleurs doivent être utilisées depuis ce fichier
 */

export const adminTheme = {
  colors: {
    // Couleurs principales
    primary: '#FFA800',
    primaryDark: '#E69500',
    secondary: '#262626',
    accent: '#FFD700',

    // Backgrounds
    backgroundLight: '#FFFFFF',
    backgroundDark: '#121212',
    surfaceLight: '#F5F5F5',
    surfaceDark: '#1E1E1E',

    // Text
    textPrimaryLight: '#000000',
    textPrimaryDark: '#FFFFFF',
    textSecondaryLight: '#666666',
    textSecondaryDark: '#B0B0B0',

    // States
    success: '#4CAF50',
    warning: '#0D1B2A',
    error: '#F44336',
    info: '#2196F3',

    // Charts
    chart1: '#4CAF50',
    chart2: '#2196F3',
    chart3: '#FF9800',
    chart4: '#9C27B0',
    chart5: '#F44336',
  },

  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
} as const;

export type AdminTheme = typeof adminTheme;

