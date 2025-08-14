import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'

const testimonials = [
	{ name: 'Amina (Parent)', text: 'Girl\'s Dignity gave my daughter the confidence to speak up and lead. We love the teachers!', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop' },
	{ name: 'Blessing (Parent)', text: 'Safe, joyful, and excellent academics. The dignity workshops are so important.', avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop' },
	{ name: 'Head Teacher', text: 'Every girl deserves a space to learn with pride. Our community makes it possible.', avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abab1?q=80&w=400&auto=format&fit=crop' },
]

export default function Testimonials() {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
			<h2 className="section-title mb-6" data-aos="fade-up">Parent Testimonials</h2>
			<Swiper modules={[Autoplay, A11y]} slidesPerView={1} spaceBetween={16} autoplay={{ delay: 4000 }}>
				{testimonials.map((t, idx) => (
					<SwiperSlide key={idx}>
						<figure className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 flex items-center gap-4" data-aos="fade-up">
							<img src={t.avatar} alt="" className="h-16 w-16 rounded-full object-cover" loading="lazy" />
							<blockquote>
								<p className="text-gray-700 dark:text-gray-200 text-lg">“{t.text}”</p>
								<figcaption className="text-sm text-gray-500 mt-2">— {t.name}</figcaption>
							</blockquote>
						</figure>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}