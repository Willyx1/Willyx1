import { useForm } from 'react-hook-form'
import confetti from 'canvas-confetti'
import { useState } from 'react'

export default function ApplyForm() {
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
	const [submitted, setSubmitted] = useState(false)
	const onSubmit = async (data) => {
		console.log('apply submission', data)
		await new Promise(r => setTimeout(r, 800))
		confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } })
		setSubmitted(true)
		reset()
		setTimeout(() => setSubmitted(false), 4000)
	}
	return (
		<div className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-soft">
			<h3 className="font-head text-2xl mb-3">Apply Now</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<input className="border rounded px-3 py-2" placeholder="Child's Full Name" {...register('childName', { required: true, minLength: 2 })} />
				<input className="border rounded px-3 py-2" placeholder="Child's Age" type="number" {...register('age', { required: true, min: 2, max: 12 })} />
				<input className="border rounded px-3 py-2" placeholder="Parent/Guardian Name" {...register('parentName', { required: true })} />
				<input className="border rounded px-3 py-2" placeholder="Parent Email" type="email" {...register('parentEmail', { required: true })} />
				<input className="border rounded px-3 py-2" placeholder="Parent Phone" type="tel" {...register('parentPhone', { required: true })} />
				<select className="border rounded px-3 py-2" defaultValue="" {...register('grade', { required: true })}>
					<option value="" disabled>Preferred Grade</option>
					<option>Nursery</option>
					<option>Primary 1</option>
					<option>Primary 2</option>
					<option>Primary 3</option>
					<option>Primary 4</option>
					<option>Primary 5</option>
					<option>Primary 6</option>
				</select>
				<textarea className="border rounded px-3 py-2 md:col-span-2" placeholder="Message" rows={4} {...register('message')} />
				<div className="md:col-span-2 flex items-center gap-3">
					<button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
					{submitted && <span className="text-green-600">Thanks! We will reach out soon.</span>}
				</div>
			</form>
			{Object.keys(errors).length > 0 && <p className="text-sm text-red-600 mt-2">Please fill in all required fields.</p>}
		</div>
	)
}