import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
import { z } from 'zod';
import { requireAdmin } from '../middleware/auth.js';

export const router = Router();

router.get('/', async (_req, res) => {
	const programs = await prisma.program.findMany({ orderBy: { name: 'asc' } });
	res.json(programs);
});

router.get('/:slug', async (req, res) => {
	const program = await prisma.program.findUnique({ where: { slug: req.params.slug } });
	if (!program) return res.status(404).json({ error: 'Not found' });
	res.json(program);
});

const upsertSchema = z.object({
	slug: z.string().min(1),
	name: z.string().min(1),
	summary: z.string().optional(),
	content: z.string().min(1),
	coverImage: z.string().optional()
});

router.post('/', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const created = await prisma.program.create({ data: parsed.data });
	res.json(created);
});

router.put('/:slug', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.partial({ slug: true }).safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const updated = await prisma.program.update({ where: { slug: req.params.slug }, data: parsed.data });
	res.json(updated);
});