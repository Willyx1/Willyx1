import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';

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