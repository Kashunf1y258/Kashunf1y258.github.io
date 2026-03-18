# Developer Site

A modern, extensible developer portfolio and blog built with Astro 5.x, deployed on GitHub Pages.

## Features

- **Blog** - Content Collections with MDX support, syntax highlighting, and tags
- **Projects** - Portfolio showcase with tech stack, status badges, and links
- **Dark Mode** - System-aware theme with manual toggle, no flash on load
- **Local Search** - Pagefind integration for instant, privacy-friendly search
- **Comments** - Giscus-powered discussions via GitHub
- **SEO** - Sitemap, RSS feed, Open Graph, and Twitter cards
- **AI Ready** - Extension points documented for future LLM integration

## Tech Stack

- **Framework**: [Astro 5.x](https://astro.build/)
- **Content**: Content Collections with Zod schemas
- **Search**: [Pagefind](https://pagefind.app/)
- **Comments**: [Giscus](https://giscus.app/)
- **Deployment**: GitHub Pages + GitHub Actions

## Project Structure

```
├── src/
│   ├── components/     # UI components
│   ├── content/        # Blog posts and projects (Markdown/MDX)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Routes
│   ├── services/       # AI service interface (placeholder)
│   └── styles/         # Global CSS with custom properties
├── public/             # Static assets
├── docs/               # Extension documentation
└── dist/               # Build output
```

## Commands

| Command           | Action                                      |
|:------------------|:--------------------------------------------|
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build to `./dist/`                          |
| `npm run preview` | Preview build locally                       |
| `npm run test`    | Run Vitest tests                            |
| `npx astro check` | TypeScript diagnostics                      |

## Content Management

### Blog Posts

Add posts to `src/content/blog/`:

```markdown
---
title: "My Post"
description: "A brief summary"
pubDate: 2026-03-18
heroImage: "../../assets/my-image.jpg"
tags: ["astro", "web"]
---

Content here...
```

### Projects

Add projects to `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "What it does"
pubDate: 2026-03-18
heroImage: "../../assets/project.png"
tech: ["TypeScript", "Astro"]
github: "https://github.com/user/repo"
demo: "https://demo.example.com"
status: "active"  # active | completed | archived
---

Description here...
```

## Configuration

### Site Metadata

Edit `src/consts.ts`:

```typescript
export const SITE_TITLE = 'Your Name';
export const SITE_DESCRIPTION = 'Your site description';
```

### Giscus Comments

1. Enable Discussions on your GitHub repo
2. Visit [giscus.app](https://giscus.app/) to generate configuration
3. Update `src/components/Giscus.astro` with your `repoId` and `categoryId`

## AI Extension

The `/ai` route and `src/services/ai-service.ts` provide extension points for future LLM integration. See `docs/ai-extension-points.md` for the migration strategy.

**Current status**: Placeholder UI with mock service. No API calls.

## Deployment

The site auto-deploys to GitHub Pages via `.github/workflows/deploy.yml`.

1. Push to `main` branch
2. GitHub Actions builds and deploys
3. Site live at `https://<username>.github.io`

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Type check
npx astro check

# Build for production
npm run build
```

## Credits

- Theme inspired by [Bear Blog](https://github.com/HermanMartinus/bearblog/)
- Built with [Astro](https://astro.build/)
- Search powered by [Pagefind](https://pagefind.app/)
