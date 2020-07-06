module.exports = {
  plugins: [
    require("cssnano")({
      preset: "default",
    }),
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-preset-env")({
      stage: 2,
      features: {
        "nesting-rules": true,
      },
    }),
  ],
};
