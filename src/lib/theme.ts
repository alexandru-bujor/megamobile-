// Force dark mode only
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('dark');
}

// Export empty hook for compatibility
export const useTheme = () => ({ theme: 'dark' as const });
