import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';

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