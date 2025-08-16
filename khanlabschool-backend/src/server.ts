import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { router as apiRouter } from './web/apiRouter.js';

const app = express();

const clientOrigin = process.env.APP_ORIGIN || '*';
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 60 * 1000, limit: 120 });
app.use(limiter);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api', apiRouter);

app.get('/health', (_req, res) => {
	res.json({ ok: true });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
	console.log(`Backend listening on http://localhost:${port}`);
});