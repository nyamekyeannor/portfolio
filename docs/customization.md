# Customization Guide

Start with `content/site-data.js`. It controls the public content rendered across the site.

## Profile

Update `site.name`, `site.role`, `site.headline`, `site.summary`, and the two call-to-action links.

Use `assets/img/avatar-placeholder.svg` until you have a real image. When you add a real image, put it in `assets/img/` and update `site.avatar`.

## Navigation

Edit `nav` when you add or remove pages.

Internal links should be relative, like `blog/` or `projects/`. External links should use full URLs.

## Landing Cards

Use `landingCards` for the first things visitors should see. Keep each card short:

- one title
- one short description
- one URL
- two or three tags

## Blog Posts

Run:

```bash
npm run new:blog -- my-post "My Post"
```

Then add the printed object to `blogPosts`.

## Talks And Sections

Talks and sections do not need individual pages by default. Add pages only when the content needs more room.

## Testing

Run:

```bash
npm test
```

The checks cover local links, required content fields, and private folders that should not exist in the template.
