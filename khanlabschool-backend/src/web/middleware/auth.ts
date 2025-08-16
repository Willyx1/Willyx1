import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUser {
	userId: string;
	role: string;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
	const auth = req.headers.authorization || '';
	const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
	if (!token) return res.status(401).json({ error: 'Missing token' });
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev') as any;
		if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'EDITOR')) {
			return res.status(403).json({ error: 'Forbidden' });
		}
		(req as any).authUser = { userId: payload.sub, role: payload.role } as AuthUser;
		return next();
	} catch {
		return res.status(401).json({ error: 'Invalid token' });
	}
}