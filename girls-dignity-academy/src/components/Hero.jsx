import { Link } from 'react-router-dom'

export default function Hero() {
	return (
		<section className="relative">
			<div className="parallax-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596495578065-8f8a9a3a9f1f?q=80&w=1600&auto=format&fit=crop')` }}>
				<div className="bg-gradient-to-b from-black/30 to-black/60 dark:from-black/50 dark:to-black/70">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 py-28 text-white">
						<h1 className="font-head text-4xl sm:text-5xl md:text-6xl mb-4" data-aos="fade-up">Empowering Girls with Education and Dignity</h1>
						<p className="max-w-2xl text-lg md:text-xl mb-8" data-aos="fade-up" data-aos-delay="100">A joyful, safe, and inclusive nursery and primary school where every girl can learn, lead, and thrive.</p>
						<div className="flex gap-3" data-aos="fade-up" data-aos-delay="200">
							<Link to="/admissions" className="btn btn-primary">Enroll Now</Link>
							<Link to="/about" className="btn btn-outline">Learn More</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}