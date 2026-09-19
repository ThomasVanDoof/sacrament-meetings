import Link from 'next/link';
import Image from 'next/image';
import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default function Home() {
  const meetings = getMeetings().slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Sunday, together</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            A clear record for every meeting.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-muted">
            Keep the ward agenda, assignments, and announcements in one calm, shared place.
          </p>
        </div>
        <Image
          src="/meeting.png"
          alt="A simple illustration of a meetinghouse"
          width={1200}
          height={600}
          className="h-auto w-full rounded-xl border border-line"
          priority
        />
      </section>
      <section className="mt-14" aria-labelledby="recent-meetings-title">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">The archive</p>
            <h2 id="recent-meetings-title" className="mt-1 font-serif text-2xl font-semibold">Recent meetings</h2>
          </div>
          <Link href="/meetings" className="text-sm font-semibold text-accent hover:text-accent-dark">View all &rarr;</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
        </div>
      </section>
    </div>
  );
}
