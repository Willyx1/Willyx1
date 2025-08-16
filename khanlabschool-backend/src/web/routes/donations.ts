import { Router } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';
import { prisma } from '../../xdb/prisma.js';

const stripe = process.env.STRIPE_SECRET_KEY
	? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' as any })
	: null;

export const router = Router();

const intentSchema = z.object({ amountCents: z.number().int().positive(), currency: z.string().default('usd') });

router.post('/create-intent', async (req, res) => {
	if (!stripe) return res.status(400).json({ error: 'Stripe not configured' });
	const parsed = intentSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const intent = await stripe.paymentIntents.create({ amount: parsed.data.amountCents, currency: parsed.data.currency });
	res.json({ clientSecret: intent.client_secret });
});

const recordSchema = z.object({
	amountCents: z.number().int().positive(), currency: z.string().default('USD'), donorName: z.string().optional(), donorEmail: z.string().email().optional(), message: z.string().optional(), paymentIntentId: z.string().optional()
});

router.post('/record', async (req, res) => {
	const parsed = recordSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const d = parsed.data;
	const created = await prisma.donation.create({ data: { amountCents: d.amountCents, currency: d.currency.toUpperCase(), donorName: d.donorName, donorEmail: d.donorEmail, message: d.message, stripePaymentIntentId: d.paymentIntentId } });
	res.json({ id: created.id });
});