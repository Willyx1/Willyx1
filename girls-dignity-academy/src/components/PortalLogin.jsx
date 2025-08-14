import { useState } from 'react'

export default function PortalLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return (
		<div className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-soft max-w-md">
			<h3 className="font-head text-2xl mb-3">Parent Portal</h3>
			<form onSubmit={(e) => { e.preventDefault(); console.log('portal login demo', { email }) }} className="space-y-3">
				<input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
				<input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
				<button className="btn btn-secondary w-full" type="submit">Login (Demo)</button>
			</form>
		</div>
	)
}