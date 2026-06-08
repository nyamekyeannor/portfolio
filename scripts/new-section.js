#!/usr/bin/env node

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:section -- "Section Title"');
  process.exit(1);
}

console.log("Add this object to sections in content/site-data.js:");
console.log(JSON.stringify({
  title,
  description: "Replace this with a short explanation of the section.",
  items: [
    "Replace this item.",
    "Add another useful detail.",
    "Link to a page if the section needs one."
  ]
}, null, 2));
