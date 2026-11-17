import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563eb', dark: '#1d4ed8', light: '#3b82f6' },
        secondary: { DEFAULT: '#f59e0b', dark: '#d97706' },
        accent: '#10b981',
        point: '#336666',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // 교육 신청 위저드: 질문이 바뀔 때 옆에서 밀려 들어온다
        'wizard-in': {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'wizard-in': 'wizard-in 0.22s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
