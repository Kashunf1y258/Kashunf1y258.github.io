---
title: "Building This Site with Astro"
description: "A deep dive into how I built this developer site using Astro and why I chose it."
pubDate: 2026-03-18
tags: ["astro", "web-development", "tutorial"]
---

When deciding how to build my developer site, I evaluated several static site generators. After careful consideration, I chose [Astro](https://astro.build) for several compelling reasons.

## Why Astro?

Astro offers some unique advantages that made it the perfect choice:

### Zero JavaScript by Default

Astro ships zero JavaScript to the client by default. This means incredibly fast page loads and better performance scores. When you do need interactivity, Astro's Islands Architecture loads JavaScript only where needed.

### Content Collections

The built-in Content Collections feature provides type-safe markdown with Zod validation. This catches errors at build time rather than runtime, giving you confidence in your content structure.

### Great Developer Experience

Hot module replacement, TypeScript support, and excellent documentation make building with Astro a joy. The component-based architecture is intuitive for anyone familiar with modern web development.

## Features Implemented

Here's what's currently running on this site:

- **Blog** with markdown and MDX support for rich content
- **Project showcase** for my portfolio work
- **Dark mode** with system preference detection
- **Search** using Pagefind for fast, static search
- **Comments** via Giscus for reader engagement

## Performance Results

The site achieves excellent performance metrics:

- Perfect Lighthouse scores
- Sub-second page loads
- Minimal JavaScript payload
- Optimized images with automatic formats

I'm excited to continue building and improving this site! If you're considering Astro for your next project, I highly recommend giving it a try.
