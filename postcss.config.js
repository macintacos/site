module.exports = {
  plugins: [
    require("cssnano")({
      preset: "default",
    }),
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
