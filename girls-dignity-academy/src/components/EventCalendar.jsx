import { useMemo, useState } from 'react'

const events = [
	{ date: '2025-09-02', title: 'Back-to-School Fair' },
	{ date: '2025-09-10', title: 'Parents Meeting' },
	{ date: '2025-10-05', title: 'Sports Day' },
	{ date: '2025-10-22', title: 'Dignity Workshop' },
]

export default function EventCalendar() {
	const [month, setMonth] = useState(new Date().getMonth())
	const filtered = useMemo(() => events.filter(e => new Date(e.date).getMonth() === month), [month])
	return (
		<div>
			<div className="flex items-center gap-3 mb-3">
				<label className="text-sm">Filter by month:</label>
				<select value={month} onChange={e => setMonth(Number(e.target.value))} className="border rounded px-3 py-2">
					{Array.from({ length: 12 }).map((_, m) => (
						<option value={m} key={m}>{new Date(2025, m, 1).toLocaleString(undefined, { month: 'long' })}</option>
					))}
				</select>
			</div>
			<ul className="space-y-2">
				{filtered.length === 0 && <li className="text-gray-500">No events this month.</li>}
				{filtered.map((e, idx) => (
					<li key={idx} className="border rounded p-3 bg-white dark:bg-gray-900 shadow-soft">
						<div className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString()}</div>
						<div className="font-semibold">{e.title}</div>
					</li>
				))}
			</ul>
		</div>
	)
}