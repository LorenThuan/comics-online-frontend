/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "white-rgb": "rgb(242, 242, 242)",
        "white-rgb2": "rgb(246, 246, 246)",
        "describes-rgb": "rgb(36, 36, 36)",
        "hr-white-rgb": "rgb(229, 231, 235)",
      },
      backgroundImage: theme => ({
        'img-bg': "url('src/assets/demo.jpg')",
        }),
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "1rem",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
};
