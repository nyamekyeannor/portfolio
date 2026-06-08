#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const [slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ").trim();

if (!slug || !title) {
  console.error('Usage: npm run new:blog -- my-post "My Post"');
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Slug must use lowercase letters, numbers, and single hyphens.");
  process.exit(1);
}

const targetDir = path.join(ROOT, "blog", slug);
const targetFile = path.join(targetDir, "index.html");

if (fs.existsSync(targetFile)) {
  console.error(`Blog post already exists: blog/${slug}/index.html`);
  process.exit(1);
}

const template = fs.readFileSync(path.join(ROOT, "templates", "blog-post.html"), "utf8");
const date = new Date().toISOString().slice(0, 10);
const summary = "Replace this summary with one practical sentence about the post.";
const html = template
  .replaceAll("{{title}}", title)
  .replaceAll("{{slug}}", slug)
  .replaceAll("{{date}}", date)
  .replaceAll("{{summary}}", summary);

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetFile, html);

const dataObject = {
  title,
  slug,
  date,
  summary,
  href: `blog/${slug}/`,
  tags: ["draft"]
};

console.log(`Created blog/${slug}/index.html`);
console.log("Add this object to blogPosts in content/site-data.js:");
console.log(JSON.stringify(dataObject, null, 2));
