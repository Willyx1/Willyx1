import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
import { z } from 'zod';
import { requireAdmin } from '../middleware/auth.js';

export const router = Router();

router.get('/', async (_req, res) => {
	const staff = await prisma.staff.findMany({ orderBy: { name: 'asc' } });
	res.json(staff);
});

router.get('/:id', async (req, res) => {
	const person = await prisma.staff.findUnique({ where: { id: req.params.id } });
	if (!person) return res.status(404).json({ error: 'Not found' });
	res.json(person);
});

const upsertSchema = z.object({
	name: z.string().min(1),
	role: z.string().min(1),
	bio: z.string().optional(),
	headshot: z.string().optional(),
	email: z.string().email().optional(),
});

router.post('/', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const created = await prisma.staff.create({ data: parsed.data });
	res.json(created);
});

router.put('/:id', requireAdmin, async (req, res) => {
	const parsed = upsertSchema.partial().safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const updated = await prisma.staff.update({ where: { id: req.params.id }, data: parsed.data });
	res.json(updated);
});