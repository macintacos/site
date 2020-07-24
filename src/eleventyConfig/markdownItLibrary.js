const mdIt = require("markdown-it");
const mdAnchorPlugin = require("markdown-it-anchor");
const mdFootnotePlugin = require("markdown-it-footnote");
const mdEmojiPlugin = require("markdown-it-emoji");
const uslug = require("uslug");
const uslugify = (s) => uslug(s);

let markdownLibrary = mdIt({
  html: true,
  breaks: true,
})
  .use(mdAnchorPlugin, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    slugify: uslugify,
  })
  .use(mdFootnotePlugin)
  .use(mdEmojiPlugin);

let mdRenderer = markdownLibrary.renderer;

mdRenderer.rules.footnote_ref = (tokens, idx, options, env) => {
  var id = mdRenderer.rules.footnote_anchor_name
    ? mdRenderer.rules.footnote_anchor_name(
        tokens,
        idx,
        options,
        env,
        markdownLibrary.renderer
      )
    : new Error("no footnote_anchor_name property");
  var caption = mdRenderer.rules.footnote_caption
    ? mdRenderer.rules.footnote_caption(
        tokens,
        idx,
        options,
        env,
        markdownLibrary.renderer
      )
    : new Error("no footnote_cation property");

  var refid = id;

  if (tokens[idx].meta.subId > 0) {
    refid += ":" + tokens[idx].meta.subId;
  }

  return `<a href="#fn${id}" class="inline-block ml-1 px-2 py bg-gray-200 rounded-full text-xs font-semibold text-gray-700" id="fnref${refid}">${caption}</a>`;
};

mdRenderer.rules.footnote_anchor = (tokens, idx, options, env) => {
  var id = mdRenderer.rules.footnote_anchor_name(
    tokens,
    idx,
    options,
    env,
    mdRenderer
  );

  var caption = mdRenderer.rules.footnote_caption
    ? mdRenderer.rules.footnote_caption(
        tokens,
        idx,
        options,
        env,
        markdownLibrary.renderer
      )
    : new Error("no footnote_cation property");

  if (tokens[idx].meta.subId > 0) {
    id += ":" + tokens[idx].meta.subId;
  }

  /* ↩ with escape code to prevent display as Apple Emoi on iOS */
  return `<a href="#fnref${id}" class="footnote-backref"><sup>${caption}</sup></a>`;
};

mdRenderer.rules.footnote_caption = (tokens, idx) => {
  let n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }

  return `0${n}`;
};

mdRenderer.rules.footnote_block_open = (options) =>
  (options.xhtmlOut
    ? '<hr class="footnotes-sep" />\n'
    : '<hr class="footnotes-sep">\n') +
  '<section class="footnotes list-decimal">\n' +
  '<ol class="footnotes-list mx-4 list-decimal">\n';

mdRenderer.rules.footnote_open = (tokens, idx, options, env, mdRenderer) => {
  var id = mdRenderer.rules.footnote_anchor_name(
    tokens,
    idx,
    options,
    env,
    mdRenderer
  );

  if (tokens[idx].meta.subId > 0) {
    id += ":" + tokens[idx].meta.subId;
  }

  return `<li id="fn${id}" class="footnote-item inline">`;
};

module.exports = markdownLibrary;
