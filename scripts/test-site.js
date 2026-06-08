#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const FAILURES = [];
const WARNINGS = [];

const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".svg",
  ".txt",
  ".yml"
]);

function fail(message) {
  FAILURES.push(message);
}

function warn(message) {
  WARNINGS.push(message);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", ".vercel", ".netlify"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else files.push(fullPath);
  }
  return files;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadSiteData() {
  const file = path.join(ROOT, "content", "site-data.js");
  const sandbox = { window: {} };
  vm.runInNewContext(read(file), sandbox, { filename: file });
  return sandbox.window.PORTFOLIO_DATA;
}

function shouldSkipRef(ref) {
  return (
    !ref ||
    ref.startsWith("#") ||
    /^(https?:|mailto:|tel:|data:|javascript:)/i.test(ref)
  );
}

function resolveLocalRef(ref, fromFile) {
  if (shouldSkipRef(ref)) return null;
  const clean = ref.split("#")[0].split("?")[0];
  let target = path.resolve(path.dirname(fromFile), clean);

  if (clean.endsWith("/") || (fs.existsSync(target) && fs.statSync(target).isDirectory())) {
    target = path.join(target, "index.html");
  }

  return target;
}

function auditLocalReferences(files) {
  const htmlFiles = files
    .filter((file) => file.endsWith(".html"))
    .filter((file) => !path.relative(ROOT, file).split(path.sep).includes("templates"));
  const attrRegex = /(?:^|\s)(?:href|src)=["']([^"']+)["']/g;
  const cssUrlRegex = /url\(["']?([^"')]+)["']?\)/g;

  for (const file of htmlFiles) {
    const html = read(file).replace(/<!--[\s\S]*?-->/g, "");

    for (const match of html.matchAll(attrRegex)) {
      const target = resolveLocalRef(match[1], file);
      if (target && !fs.existsSync(target)) {
        fail(`Missing local reference in ${path.relative(ROOT, file)}: ${match[1]}`);
      }
    }
  }

  for (const file of files.filter((item) => item.endsWith(".css"))) {
    const css = read(file);
    for (const match of css.matchAll(cssUrlRegex)) {
      const target = resolveLocalRef(match[1], file);
      if (target && !fs.existsSync(target)) {
        fail(`Missing CSS asset in ${path.relative(ROOT, file)}: ${match[1]}`);
      }
    }
  }
}

function auditSiteData(data) {
  if (!data || typeof data !== "object") fail("content/site-data.js must define window.PORTFOLIO_DATA");

  for (const key of ["site", "nav", "social", "landingCards", "projects", "talks", "blogPosts", "sections"]) {
    if (!(key in data)) fail(`Missing site data key: ${key}`);
  }

  for (const key of ["nav", "social", "landingCards", "projects", "talks", "blogPosts", "sections"]) {
    if (!Array.isArray(data[key])) fail(`Site data key must be an array: ${key}`);
  }

  if (!data.site?.name || !data.site?.headline || !data.site?.summary) {
    fail("site data needs site.name, site.headline, and site.summary");
  }

  for (const post of data.blogPosts || []) {
    if (!post.title || !post.slug || !post.href) fail(`Blog post is missing title, slug, or href: ${JSON.stringify(post)}`);
    const target = path.join(ROOT, post.href, "index.html");
    if (post.href && post.href !== "blog/" && !fs.existsSync(target)) {
      warn(`Blog post has no page yet: ${post.href}`);
    }
  }

  for (const group of ["landingCards", "projects", "talks", "blogPosts"]) {
    for (const item of data[group] || []) {
      if (!item.title) fail(`${group} item is missing title`);
      if (!item.description && !item.summary) fail(`${group} item is missing description or summary: ${item.title}`);
    }
  }
}

function auditDataLinks(data) {
  const groups = ["nav", "social", "landingCards", "projects", "talks", "blogPosts"];

  for (const group of groups) {
    for (const item of data[group] || []) {
      const href = item.href;
      if (!href || shouldSkipRef(href)) continue;
      const target = path.join(ROOT, href);
      const file = href.endsWith("/") ? path.join(target, "index.html") : target;
      if (!fs.existsSync(file)) {
        fail(`Missing local data link for ${group}: ${href}`);
      }
    }
  }
}

function auditContentGuard(files) {
  const rawTerms = process.env.CONTENT_GUARD_TERMS || "";
  const terms = rawTerms
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);

  if (!terms.length) return;

  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
    const body = read(file).toLowerCase();
    for (const term of terms) {
      if (body.includes(term.toLowerCase())) {
        fail(`Content guard term found in ${path.relative(ROOT, file)}: ${term}`);
      }
    }
  }
}

function auditNoPrivateSurfaces() {
  for (const name of ["audio", "api", "private"]) {
    if (fs.existsSync(path.join(ROOT, name))) {
      fail(`Template should not include a ${name}/ directory by default`);
    }
  }
}

const files = walk(ROOT);
const data = loadSiteData();

auditLocalReferences(files);
auditSiteData(data);
auditDataLinks(data);
auditContentGuard(files);
auditNoPrivateSurfaces();

for (const warning of WARNINGS) console.warn(`WARN: ${warning}`);

if (FAILURES.length) {
  console.error("Site checks failed:");
  for (const failure of FAILURES) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Site checks passed.");
