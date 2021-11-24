module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}','./pages/user/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height:{
        "content":"max-content"
      },
      width:{
        "content":"max-content",
        "fill":"-webkit-fill-available"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
