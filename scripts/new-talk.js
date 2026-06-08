#!/usr/bin/env node

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:talk -- "Talk Title"');
  process.exit(1);
}

console.log("Add this object to talks in content/site-data.js:");
console.log(JSON.stringify({
  title,
  event: "Event Name",
  date: new Date().toISOString().slice(0, 10),
  description: "Replace this with the talk promise in one sentence.",
  href: "talks/",
  tags: ["talk"]
}, null, 2));
