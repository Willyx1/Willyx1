import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
import { z } from 'zod';
import { requireAdmin } from '../middleware/auth';

export const router = Router();

router.get('/', async (_req, res) => {
	const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' } });
	res.json(posts);
});

router.get('/:slug', async (req, res) => {
	const post = await prisma.post.findUnique({ where: { slug: req.params.slug } });
	if (!post || !post.published) return res.status(404).json({ error: 'Not found' });
	res.json(post);
});

const upsertSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	excerpt: z.string().optional(),
	content: z.string().min(1),
	coverImage: z.string().optional(),
	published: z.boolean().optional()
});

router.post('/', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const data = parsed.data;
	const created = await prisma.post.create({ data: { ...data, publishedAt: data.published ? new Date() : null } });
	res.json(created);
});

router.put('/:slug', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.partial({ slug: true }).safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const updated = await prisma.post.update({ where: { slug: req.params.slug }, data: { ...parsed.data, publishedAt: parsed.data.published ? new Date() : undefined } });
	res.json(updated);
});