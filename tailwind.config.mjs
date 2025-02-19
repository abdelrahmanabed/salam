/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      borderRadius: {
        'main': '12px',
        'full': '400px',
        'circle':'50%',
      },
      colors: {
          'backgroundcolor': '#e7e5e4',
          'boxcolor':'#ffffff',
          'maincolor': '#2563eb',
          'subcolor': '#000000',
          'hovercolor': '#e7e5e4',
          'redcolor': '#ef4444',
          'lightred': '#fca5a5',
          'darkred': '#450a0a',
          'greencolor': '#16a34a',
          'lightgreen': '#86efac',
          'darkgreen': '#052e16',
          'bluecolor': '#3b82f6',
          'lightblue': '#93c5fd',
          'darkbluea': '#1e40af',
          'darkblueb': '#1e3a8a',
          'darkbluec': '#172554',
          'darkgrey': '#899499',
          'border':'#dddddd',
          'textcolor': '#000000',
          'subtextcolor':'#ffffff',
          'blackgrey':'#3d3d3d',
          'orangecolor': '#f97316',
          'lightorange': '#fdba74',
          'darkorange': '#431407',
          'pinkcolor': '#a21caf',
          'lightpink': '#f0abfc',
          'darkpink': '#4a044e',
          'verylightred':'#fee2e2',
          'verylightorange':'#fed7aa',
          'verylightblue':'#dbeafe',
          'verylightgreen':'#bbf7d0',
          'darkbox': '#1B1B1B',
          'rosecolor':'#db2777',
          'darkrose':'#500724',
          'yellowcolor': '#eab308',
          'darkyellow':'#422006',
          'cyancolor':'#06b6d4',
          'darkcyan':'#083344'
      },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')

  ],
};
