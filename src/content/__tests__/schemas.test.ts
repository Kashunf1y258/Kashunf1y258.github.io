import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	draft: z.boolean().optional(),
	tags: z.array(z.string()).optional(),
});

const projectsSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	heroImage: z.string().optional(),
	tech: z.array(z.string()).optional(),
	github: z.string().url().optional(),
	demo: z.string().url().optional(),
	status: z.enum(['active', 'archived', 'wip']).optional(),
});

describe('Content Schema', () => {
	it('blog schema should have required fields', () => {
		const fields = blogSchema.shape;
		expect(fields.title).toBeDefined();
		expect(fields.description).toBeDefined();
		expect(fields.pubDate).toBeDefined();
	});

	it('blog schema should have optional fields', () => {
		const fields = blogSchema.shape;
		expect(fields.updatedDate).toBeDefined();
		expect(fields.heroImage).toBeDefined();
		expect(fields.draft).toBeDefined();
		expect(fields.tags).toBeDefined();
	});

	it('projects schema should have required fields', () => {
		const fields = projectsSchema.shape;
		expect(fields.title).toBeDefined();
		expect(fields.description).toBeDefined();
		expect(fields.pubDate).toBeDefined();
	});

	it('projects schema should have optional fields', () => {
		const fields = projectsSchema.shape;
		expect(fields.heroImage).toBeDefined();
		expect(fields.tech).toBeDefined();
		expect(fields.github).toBeDefined();
		expect(fields.demo).toBeDefined();
		expect(fields.status).toBeDefined();
	});
});

describe('Valid Blog Frontmatter', () => {
	it('should validate a complete valid blog frontmatter', () => {
		const blogData = {
			title: 'Test Blog Post',
			description: 'A comprehensive test post',
			pubDate: new Date('2024-01-15'),
			updatedDate: new Date('2024-01-20'),
			heroImage: '/images/hero.jpg',
			draft: false,
			tags: ['typescript', 'astro', 'testing'],
		};

		const result = blogSchema.safeParse(blogData);
		expect(result.success).toBe(true);
	});

	it('should validate a minimal valid blog frontmatter', () => {
		const blogData = {
			title: 'Minimal Blog Post',
			description: 'A minimal test post',
			pubDate: '2024-01-15',
		};

		const result = blogSchema.safeParse(blogData);
		expect(result.success).toBe(true);
	});
});

describe('Invalid Blog Frontmatter', () => {
	it('should reject blog missing title', () => {
		const invalidBlog = {
			description: 'A test blog post',
			pubDate: '2024-01-15',
		};

		const result = blogSchema.safeParse(invalidBlog);
		expect(result.success).toBe(false);
	});

	it('should reject blog missing description', () => {
		const invalidBlog = {
			title: 'Test Blog Post',
			pubDate: '2024-01-15',
		};

		const result = blogSchema.safeParse(invalidBlog);
		expect(result.success).toBe(false);
	});

	it('should reject blog missing pubDate', () => {
		const invalidBlog = {
			title: 'Test Blog Post',
			description: 'A test blog post',
		};

		const result = blogSchema.safeParse(invalidBlog);
		expect(result.success).toBe(false);
	});

	it('should reject blog with completely empty data', () => {
		const invalidBlog = {};

		const result = blogSchema.safeParse(invalidBlog);
		expect(result.success).toBe(false);
	});
});

describe('Valid Project Frontmatter', () => {
	it('should validate a complete valid project frontmatter', () => {
		const projectData = {
			title: 'Test Project',
			description: 'A comprehensive test project',
			pubDate: new Date('2024-01-15'),
			heroImage: '/images/project.jpg',
			tech: ['TypeScript', 'Astro', 'React'],
			github: 'https://github.com/test/project',
			demo: 'https://demo.example.com',
			status: 'active',
		};

		const result = projectsSchema.safeParse(projectData);
		expect(result.success).toBe(true);
	});

	it('should validate a minimal valid project frontmatter', () => {
		const projectData = {
			title: 'Minimal Project',
			description: 'A minimal test project',
			pubDate: '2024-01-15',
		};

		const result = projectsSchema.safeParse(projectData);
		expect(result.success).toBe(true);
	});

	it('should validate project with all optional fields', () => {
		const projectData = {
			title: 'Full Featured Project',
			description: 'A project with all fields',
			pubDate: '2024-01-15',
			tech: ['Astro'],
			github: 'https://github.com/test/project',
			demo: 'https://demo.example.com',
			status: 'wip',
		};

		const result = projectsSchema.safeParse(projectData);
		expect(result.success).toBe(true);
	});
});

describe('Draft Filtering', () => {
	it('should validate draft: true', () => {
		const draftPost = {
			title: 'Draft Post',
			description: 'A draft blog post',
			pubDate: '2024-01-15',
			draft: true,
		};

		const result = blogSchema.safeParse(draftPost);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.draft).toBe(true);
		}
	});

	it('should validate draft: false', () => {
		const publishedPost = {
			title: 'Published Post',
			description: 'A published blog post',
			pubDate: '2024-01-15',
			draft: false,
		};

		const result = blogSchema.safeParse(publishedPost);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.draft).toBe(false);
		}
	});

	it('should allow undefined draft (published by default)', () => {
		const postWithoutDraft = {
			title: 'Post Without Draft',
			description: 'A post without draft specified',
			pubDate: '2024-01-15',
		};

		const result = blogSchema.safeParse(postWithoutDraft);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.draft).toBeUndefined();
		}
	});
});
