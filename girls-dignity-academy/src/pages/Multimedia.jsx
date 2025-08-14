import { useEffect, useState } from 'react'
import AOS from 'aos'
import VirtualTour from '../components/VirtualTour'

const photos = [
	'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1518659526055-cf9e1d1d6ed0?q=80&w=800&auto=format&fit=crop'
]

export default function Multimedia() {
	useEffect(() => { AOS.init({ once: true }) }, [])
	const [quizAnswer, setQuizAnswer] = useState('')
	const [result, setResult] = useState('')
	const submitQuiz = (e) => {
		e.preventDefault()
		setResult(`Great choice! ${quizAnswer} is super fun at our school.`)
	}
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
			<h1 className="section-title mb-6" data-aos="fade-up">Multimedia & Engagement</h1>
			<section className="grid md:grid-cols-2 gap-6" data-aos="fade-up">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4">
					<h2 className="font-head text-2xl mb-2">Photo Gallery</h2>
					<div className="grid grid-cols-2 gap-3">
						{photos.map((src, idx) => <img key={idx} src={src} alt="" className="rounded-lg shadow-soft" loading="lazy" />)}
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4">
					<h2 className="font-head text-2xl mb-2">Videos</h2>
					<div className="grid grid-cols-1 gap-3">
						<div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">School Tour (video placeholder)</div>
						<div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">Classroom Moments (video placeholder)</div>
					</div>
				</div>
			</section>
			<section className="mt-8" data-aos="fade-up">
				<VirtualTour />
			</section>
			<section className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-soft p-4" data-aos="fade-up">
				<h2 className="font-head text-2xl mb-2">Fun Quiz: What’s Your Favorite School Activity?</h2>
				<form onSubmit={submitQuiz} className="flex flex-wrap gap-3 items-center">
					<select className="border rounded px-3 py-2" value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)} required>
						<option value="">Choose one</option>
						<option>Reading stories</option>
						<option>Math games</option>
						<option>Sports</option>
						<option>Art & Music</option>
					</select>
					<button className="btn btn-secondary" type="submit">Submit</button>
					{result && <span className="text-brand-green font-semibold">{result}</span>}
				</form>
			</section>
		</div>
	)
}