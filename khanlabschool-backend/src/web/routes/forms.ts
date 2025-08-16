import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../xdb/prisma.js';

export const router = Router();

const submissionSchema = z.object({
	type: z.string().min(1),
	data: z.record(z.string(), z.unknown())
});

router.post('/submit', async (req, res) => {
	const parsed = submissionSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const created = await prisma.formSubmission.create({ data: { type: parsed.data.type, data: JSON.stringify(parsed.data.data) } });
	res.json({ id: created.id });
});