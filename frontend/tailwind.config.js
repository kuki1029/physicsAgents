import colors from 'tailwindcss/colors';

export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {      
      colors: {
        primary: { ...colors.black, DEFAULT: "#000" }
      }
    },
  },
  plugins: [],
};
