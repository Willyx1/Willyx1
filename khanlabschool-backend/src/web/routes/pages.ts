import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';

export const router = Router();

router.get('/', async (_req, res) => {
	const pages = await prisma.page.findMany({ where: { visible: true }, orderBy: { updatedAt: 'desc' } });
	res.json(pages);
});

router.get('/:slug', async (req, res) => {
	const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
	if (!page || !page.visible) return res.status(404).json({ error: 'Not found' });
	res.json(page);
});