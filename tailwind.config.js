module.exports = {
  purge: { content: ["./templates/**/*.njk"] },
  theme: {
    extend: {},
    inset: {
      "0": 0,
      auto: "auto",
      "1/2": "50%",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      circle: "circle",
      roman: "upper-roman",
      alpha: "lower-alpha",
    },
  },
  variants: {},
  plugins: [],
};
