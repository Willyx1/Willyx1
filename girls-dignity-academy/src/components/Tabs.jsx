import { useState } from 'react'

export default function Tabs({ tabs }) {
	const [active, setActive] = useState(0)
	return (
		<div>
			<div className="flex flex-wrap gap-2 mb-4">
				{tabs.map((t, idx) => (
					<button key={t.label} className={`px-4 py-2 rounded-full text-sm font-semibold border ${active === idx ? 'bg-brand-blue text-white border-brand-blue' : 'border-gray-300 dark:border-gray-700'}`} onClick={() => setActive(idx)}>
						{t.label}
					</button>
				))}
			</div>
			<div>
				{tabs[active]?.content}
			</div>
		</div>
	)
}