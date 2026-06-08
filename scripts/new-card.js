#!/usr/bin/env node

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:card -- "Card Title"');
  process.exit(1);
}

console.log("Add this object to landingCards in content/site-data.js:");
console.log(JSON.stringify({
  title,
  eyebrow: "Featured",
  description: "Replace this with one practical sentence about the card.",
  href: "projects/",
  tags: ["example"]
}, null, 2));
