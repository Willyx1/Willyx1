import { Router } from 'express';
import { prisma } from '../../xdb/prisma.js';
export const router = Router();
router.get('/', async (_req, res) => {
    const programs = await prisma.program.findMany({ orderBy: { name: 'asc' } });
    res.json(programs);
});
router.get('/:slug', async (req, res) => {
    const program = await prisma.program.findUnique({ where: { slug: req.params.slug } });
    if (!program)
        return res.status(404).json({ error: 'Not found' });
    res.json(program);
});
