import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
	return (
		<div className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
			<p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Meeting planner</p>
			<h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Create meeting</h1>
			<MeetingForm />
		</div>
	);
}