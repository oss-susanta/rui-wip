module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{js,jsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        body: "var(--rui-c-body)",
        body2: "var(--rui-c-body2)",
        divider: "var(--rui-c-divider)",
        glyph: "var(--rui-c-glyph)",
        icon: "var(--rui-c-icon)",
        primary: "var(--rui-c-primary)",
        inherit: "inherit",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
