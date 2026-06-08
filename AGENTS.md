# Agent Instructions

This repo is a public portfolio template. Treat it like a starter kit, not a personal archive.

## Ground Rules

- Do not copy private, personal, client, employer, or unpublished content into this repo.
- Use fake example content unless the user provides exact replacement text.
- Keep the site static unless the user explicitly asks for a framework or backend.
- Do not add analytics, tracking pixels, paid API calls, audio generation, or secret-dependent features without explicit approval.
- Do not store API keys, tokens, private notes, transcripts, resumes, or drafts.
- Do not delete folders with terminal commands.
- Keep copy direct and plain. Avoid sales language.
- Run `npm test` before handing work back.

## Source Of Truth

Most edits should happen in `content/site-data.js`.

Use these arrays:

- `landingCards` for cards on the home page
- `projects` for project entries
- `talks` for talks and workshops
- `blogPosts` for writing
- `sections` for custom sections

Add a standalone page only when an item needs a real URL.

## Add A Blog Post

1. Run `npm run new:blog -- my-post "My Post"`.
2. Edit the generated `blog/my-post/index.html`.
3. Add the printed object to `blogPosts` in `content/site-data.js`.
4. Link to `blog/my-post/`.
5. Run `npm test`.

## Add A Landing Page Card

1. Run `npm run new:card -- "Card Title"`.
2. Add the object to `landingCards`.
3. Use a short title, one practical sentence, and a clear URL.
4. Run `npm test`.

## Add A Talk

1. Run `npm run new:talk -- "Talk Title"`.
2. Add the object to `talks`.
3. Add slides, video, or event links only if the user gives them.
4. Run `npm test`.

## Add A Section

1. Run `npm run new:section -- "Section Title"`.
2. Add the object to `sections`.
3. Keep section items short enough to scan.
4. Run `npm test`.

## Before Publishing

- Replace fake profile details.
- Check every link.
- Confirm all example copy is intentional.
- Run `npm test`.
