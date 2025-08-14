import { useState } from 'react'

export default function Gallery({ images }) {
	const [open, setOpen] = useState(false)
	const [current, setCurrent] = useState(0)
	const openAt = (idx) => { setCurrent(idx); setOpen(true) }
	return (
		<div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
				{images.map((src, idx) => (
					<button key={idx} className="aspect-[4/3] overflow-hidden rounded-lg shadow-soft" onClick={() => openAt(idx)}>
						<img src={src} alt="School facility" className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
					</button>
				))}
			</div>
			{open && (
				<div className="modal-backdrop" onClick={() => setOpen(false)}>
					<div className="modal-card" onClick={e => e.stopPropagation()}>
						<img src={images[current]} alt="Preview" className="w-full h-auto rounded" />
						<div className="flex justify-between mt-3">
							<button className="btn btn-outline" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>Prev</button>
							<button className="btn btn-primary" onClick={() => setCurrent((current + 1) % images.length)}>Next</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}