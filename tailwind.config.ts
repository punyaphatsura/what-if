import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["wi-primary", "text-3xl", "lg:text-4xl"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "wi-primary": "#3ED59F",
        "wi-pink": "#EECCFF",
        "wi-blue": "#A1DBEB",
        "wi-lemon": "#ECF87F",
      },
    },
  },
  plugins: [],
};
export default config;
