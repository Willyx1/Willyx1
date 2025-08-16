import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
export const router = Router();
router.get('/', async (_req, res) => {
    const staff = await prisma.staff.findMany({ orderBy: { name: 'asc' } });
    res.json(staff);
});
router.get('/:id', async (req, res) => {
    const person = await prisma.staff.findUnique({ where: { id: req.params.id } });
    if (!person)
        return res.status(404).json({ error: 'Not found' });
    res.json(person);
});
