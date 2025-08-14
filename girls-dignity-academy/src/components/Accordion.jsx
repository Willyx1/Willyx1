import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function Accordion({ items }) {
	return (
		<div className="space-y-3">
			{items.map((item, idx) => (
				<AccordionItem key={idx} title={item.title} content={item.content} />
			))}
		</div>
	)
}

function AccordionItem({ title, content }) {
	const [open, setOpen] = useState(false)
	return (
		<div className="border border-gray-200 dark:border-gray-800 rounded-lg">
			<button className="w-full flex items-center justify-between p-4" onClick={() => setOpen(!open)} aria-expanded={open}>
				<span className="font-semibold">{title}</span>
				<FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
			</button>
			{open && (
				<div className="p-4 pt-0 text-gray-700 dark:text-gray-300">
					{typeof content === 'string' ? <p>{content}</p> : content}
				</div>
			)}
		</div>
	)
}