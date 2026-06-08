# My Portfolio Template

A clean static portfolio template that people and coding agents can clone, edit, and publish.

It is designed around one source of truth: `content/site-data.js`. Change the data, add pages when needed, run the tests, and ship.

## What You Get

- Landing page with profile copy, featured cards, projects, writing, talks, and custom sections
- Blog, talks, projects, and sections index pages
- One fake example blog post
- Helper scripts that create new blog pages or print content objects
- Agent instructions for Claude Code, Codex, and other coding agents
- Local link checks and content guard support
- No build step and no paid APIs

## Quick Start

```bash
npm run dev
npm test
```

The dev server prints the local URL. The site is static, so it also works on GitHub Pages, Netlify, Vercel, or any basic static host.

## Customize The Site

Edit `content/site-data.js`.

Update these sections first:

- `site`: name, role, headline, summary, calls to action
- `nav`: top-level navigation
- `social`: profile links
- `landingCards`: cards on the home page
- `projects`: project list
- `talks`: talk list
- `blogPosts`: writing list
- `sections`: any extra home page or index content

## Add Content

Create a blog page:

```bash
npm run new:blog -- my-new-post "My New Post"
```

Print a landing card object:

```bash
npm run new:card -- "Demo Notes"
```

Print a talk object:

```bash
npm run new:talk -- "How I Built The Demo"
```

Print a custom section object:

```bash
npm run new:section -- "Now"
```

After adding content, update `content/site-data.js`, then run:

```bash
npm test
```

## Agent Workflow

Agents should read `AGENTS.md` before changing files. The short version:

1. Use fake/example content unless the user provides real content.
2. Keep all public content in `content/site-data.js`.
3. Add a page only when a link needs a real destination.
4. Run `npm test`.
5. Do not add tracking, paid APIs, private data, or generated audio unless the user explicitly asks.

## Publish

Create a new public repository, push this folder, then enable your static host.

For GitHub Pages, set Pages to deploy from the default branch root. Because the site uses relative links, it can run from a user domain or a project subpath.
