import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const newsItems = [
	{ title: 'Back-to-School Fair', date: '2025-09-02', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop', summary: 'Join us for uniforms, books, and meet your teachers!' },
	{ title: 'Dignity Workshop', date: '2025-08-20', img: 'https://images.unsplash.com/photo-1601597111113-fcf9f5d8c987?q=80&w=1200&auto=format&fit=crop', summary: 'Menstrual health and hygiene education for upper primary.' },
	{ title: 'Library Renovation', date: '2025-08-01', img: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=1200&auto=format&fit=crop', summary: 'New shelves, story corners, and reading buddies program.' },
]

export default function NewsCarousel() {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" aria-label="Recent News and Announcements">
			<h2 className="section-title mb-6" data-aos="fade-up">Latest News</h2>
			<Swiper
				modules={[Autoplay, Pagination, A11y]}
				slidesPerView={1}
				spaceBetween={16}
				breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
				autoplay={{ delay: 3500, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				className="pb-8"
			>
				{newsItems.map((n, idx) => (
					<SwiperSlide key={idx}>
						<article className="bg-white dark:bg-gray-900 rounded-xl shadow-soft overflow-hidden" data-aos="zoom-in">
							<img src={n.img} alt="" className="h-40 w-full object-cover" loading="lazy" />
							<div className="p-4">
								<div className="text-xs text-gray-500 mb-1">{new Date(n.date).toLocaleDateString()}</div>
								<h3 className="font-semibold text-gray-900 dark:text-white">{n.title}</h3>
								<p className="text-sm text-gray-600 dark:text-gray-300">{n.summary}</p>
							</div>
						</article>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}