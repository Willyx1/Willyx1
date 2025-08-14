import { useEffect, useMemo, useState } from 'react'
import AOS from 'aos'
import EventCalendar from '../components/EventCalendar'

const posts = [
	{ id: 1, title: 'Back-to-School Fair', date: '2025-09-02', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop', summary: 'Uniforms, books, and meet your teachers!' },
	{ id: 2, title: 'Dignity Workshop', date: '2025-08-20', img: 'https://images.unsplash.com/photo-1601597111113-fcf9f5d8c987?q=80&w=1200&auto=format&fit=crop', summary: 'Menstrual health and hygiene education.' },
	{ id: 3, title: 'Library Renovation', date: '2025-08-01', img: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=1200&auto=format&fit=crop', summary: 'New shelves and story corners.' },
	{ id: 4, title: 'Science Fair', date: '2025-07-10', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop', summary: 'Inventive projects by our girls!' },
	{ id: 5, title: 'Sports Day', date: '2025-06-15', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', summary: 'Fun and teamwork across grades.' },
]

export default function NewsEvents() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	const [page, setPage] = useState(1)
	const perPage = 3
	const totalPages = Math.ceil(posts.length / perPage)
	const visible = useMemo(() => posts.slice((page - 1) * perPage, page * perPage), [page])
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">News & Events</h1>
			<section className="grid lg:grid-cols-3 gap-6" data-aos="fade-up">
				<div className="lg:col-span-2 space-y-4">
					{visible.map(p => (
						<article key={p.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-soft overflow-hidden">
							<img src={p.img} alt="" className="h-48 w-full object-cover" loading="lazy" />
							<div className="p-4">
								<div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
								<h2 className="font-head text-2xl">{p.title}</h2>
								<p className="text-gray-700 dark:text-gray-300">{p.summary}</p>
							</div>
						</article>
					))}
					<div className="flex gap-2 items-center">
						<button className="btn btn-outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
						<div className="text-sm">Page {page} of {totalPages}</div>
						<button className="btn btn-outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
					</div>
				</div>
				<div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4">
					<h3 className="font-head text-2xl mb-2">Event Calendar</h3>
					<EventCalendar />
				</div>
			</section>
		</div>
	)
}