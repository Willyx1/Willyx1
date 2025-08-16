import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
import { z } from 'zod';
import { requireAdmin } from '../middleware/auth';

export const router = Router();

router.get('/', async (_req, res) => {
	const events = await prisma.event.findMany({ orderBy: { startsAt: 'asc' } });
	res.json(events);
});

router.get('/featured', async (_req, res) => {
	const events = await prisma.event.findMany({ where: { featured: true }, orderBy: { startsAt: 'asc' } });
	res.json(events);
});

router.get('/:id', async (req, res) => {
	const event = await prisma.event.findUnique({ where: { id: req.params.id } });
	if (!event) return res.status(404).json({ error: 'Not found' });
	res.json(event);
});

const upsertSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	startsAt: z.coerce.date(),
	endsAt: z.coerce.date(),
	location: z.string().optional(),
	featured: z.boolean().optional()
});

router.post('/', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const created = await prisma.event.create({ data: parsed.data });
	res.json(created);
});

router.put('/:id', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.partial().safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const updated = await prisma.event.update({ where: { id: req.params.id }, data: parsed.data });
	res.json(updated);
});