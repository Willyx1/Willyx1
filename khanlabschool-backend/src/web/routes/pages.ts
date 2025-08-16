import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
import { z } from 'zod';
import { requireAdmin } from '../middleware/auth.js';

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

const upsertSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	heroImage: z.string().optional(),
	content: z.string().min(1),
	visible: z.boolean().optional()
});

router.post('/', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const created = await prisma.page.create({ data: { ...parsed.data, visible: parsed.data.visible ?? true } });
	res.json(created);
});

router.put('/:slug', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.partial({ slug: true }).safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const updated = await prisma.page.update({ where: { slug: req.params.slug }, data: parsed.data });
	res.json(updated);
});