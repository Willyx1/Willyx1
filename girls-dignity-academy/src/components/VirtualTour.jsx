import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import 'swiper/css'

const tour = [
	'https://images.unsplash.com/photo-1596495578065-8f8a9a3a9f1f?q=80&w=1200&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1531265726475-52ad60219627?q=80&w=1200&auto=format&fit=crop'
]

export default function VirtualTour() {
	return (
		<div>
			<h3 className="font-head text-2xl mb-3">Virtual Tour</h3>
			<Swiper modules={[Navigation, A11y]} navigation slidesPerView={1} className="rounded-xl overflow-hidden shadow-soft">
				{tour.map((src, idx) => (
					<SwiperSlide key={idx}>
						<img src={src} alt="School view" className="w-full h-64 md:h-96 object-cover" loading="lazy" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}