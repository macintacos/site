const { DateTime } = require("luxon");
const fs = require("fs");

// Plugins
const { FontAwesomeIcon } = require("@campj/eleventy-fa-icons");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginErrorOverlay = require("eleventy-plugin-error-overlay");
const markdownItLibrary = require("./src/eleventyConfig/markdownItLibrary.js");

module.exports = function (eleventyConfig) {
  // Plugins {{{
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginErrorOverlay);
  // }}}

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addNunjucksShortcode("FontAwesomeIcon", FontAwesomeIcon);

  // Filters {{{
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("head", (array, n) => {
    // Get the first `n` elements of a collection.
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });
  // }}}

  eleventyConfig.addCollection(
    "tagList",
    require("./src/site/_11ty/getTagList")
  );

  eleventyConfig.addPassthroughCopy("./src/site/img");
  eleventyConfig.addPassthroughCopy("./src/site/style/build");

  eleventyConfig.setLibrary("md", markdownItLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
