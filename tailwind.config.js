module.exports = {
  purge: { content: ["./templates/**/*.njk"] },
  theme: {
    extend: {},
  },
  variants: [],
  plugins: [require("tailwindcss-interaction-variants")],
};

// TODO: Figure out how we want to compile all the CSS without using a preprocessor; I guess just make a glob rule to spit them all out?
// TODO: Work understanding how to get the same layout just by using Tailwind
// TODO: Make sure that your layout looks the same as it does when you added dakr mode support (there's information in their documentation).
// TODO: See if you can find a more minimal code block styling (maybe look to see what Tailwind's website is using?)
