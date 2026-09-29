'use client';

import { useActionState } from 'react';
import { createMeeting, updateMeeting } from '@/lib/actions';
import type { MeetingActionState, SacramentMeeting } from '@/lib/types';

const initialState: MeetingActionState = { message: '' };
const inputClassName = 'mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-foreground outline-none focus:border-accent';

interface MeetingFormProps {
	meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
	const action = meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;
	const [state, formAction, isPending] = useActionState(action, initialState);
	const values = state.values;
	const error = (field: string) => state.errors?.[field]?.join(' ');
	const value = (field: string, initial: string) => values?.[field] ?? initial;
	const inputProps = (field: string) => ({
		'aria-describedby': `${field}-error`,
		'aria-invalid': Boolean(error(field)),
	});

	return (
		<form action={formAction} className="mt-8 space-y-8">
			<div className="grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="date" className="font-medium">Date</label>
					<input {...inputProps('date')} className={inputClassName} id="date" name="date" type="date" defaultValue={value('date', meeting?.date ?? '')} />
					<div id="date-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('date')}</div>
				</div>
				<div>
					<label htmlFor="meetingType" className="font-medium">Meeting type</label>
					<select {...inputProps('meetingType')} className={inputClassName} id="meetingType" name="meetingType" defaultValue={value('meetingType', meeting?.meetingType ?? 'regular')}>
						<option value="regular">Regular</option>
						<option value="testimony">Testimony</option>
						<option value="stake">Stake</option>
						<option value="general">General</option>
					</select>
					<div id="meetingType-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('meetingType')}</div>
				</div>
				<div>
					<label htmlFor="presiding" className="font-medium">Presiding</label>
					<input {...inputProps('presiding')} className={inputClassName} id="presiding" name="presiding" defaultValue={value('presiding', meeting?.presiding ?? '')} />
					<div id="presiding-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('presiding')}</div>
				</div>
				<div>
					<label htmlFor="conducting" className="font-medium">Conducting</label>
					<input {...inputProps('conducting')} className={inputClassName} id="conducting" name="conducting" defaultValue={value('conducting', meeting?.conducting ?? '')} />
					<div id="conducting-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('conducting')}</div>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="announcements" className="font-medium">Announcements</label>
					<textarea {...inputProps('announcements')} className={inputClassName} id="announcements" name="announcements" rows={3} defaultValue={value('announcements', meeting?.announcements?.join('\n') ?? '')} />
					<div id="announcements-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('announcements')}</div>
				</div>
				<div>
					<label htmlFor="openingHymnNumber" className="font-medium">Opening hymn number</label>
					<input {...inputProps('openingHymnNumber')} className={inputClassName} id="openingHymnNumber" name="openingHymnNumber" type="number" min="1" defaultValue={value('openingHymnNumber', String(meeting?.openingHymn.number ?? ''))} />
					<div id="openingHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('openingHymnNumber')}</div>
				</div>
				<div>
					<label htmlFor="openingHymnTitle" className="font-medium">Opening hymn title</label>
					<input {...inputProps('openingHymnTitle')} className={inputClassName} id="openingHymnTitle" name="openingHymnTitle" defaultValue={value('openingHymnTitle', meeting?.openingHymn.title ?? '')} />
					<div id="openingHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('openingHymnTitle')}</div>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="openingPrayer" className="font-medium">Opening prayer</label>
					<input {...inputProps('openingPrayer')} className={inputClassName} id="openingPrayer" name="openingPrayer" defaultValue={value('openingPrayer', meeting?.openingPrayer ?? '')} />
					<div id="openingPrayer-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('openingPrayer')}</div>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="wardBusiness" className="font-medium">Ward business</label>
					<textarea {...inputProps('wardBusiness')} className={inputClassName} id="wardBusiness" name="wardBusiness" rows={3} defaultValue={value('wardBusiness', meeting?.wardBusiness.map((item) => item.description).join('\n') ?? '')} />
					<div id="wardBusiness-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('wardBusiness')}</div>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="stakeBusiness" className="flex items-center gap-3 font-medium">
						<input {...inputProps('stakeBusiness')} id="stakeBusiness" name="stakeBusiness" type="checkbox" value="true" defaultChecked={value('stakeBusiness', String(meeting?.stakeBusiness ?? false)) === 'true'} />
						Includes stake business
					</label>
					<div id="stakeBusiness-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('stakeBusiness')}</div>
				</div>
				<div>
					<label htmlFor="sacramentHymnNumber" className="font-medium">Sacrament hymn number</label>
					<input {...inputProps('sacramentHymnNumber')} className={inputClassName} id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1" defaultValue={value('sacramentHymnNumber', String(meeting?.sacramentHymn.number ?? ''))} />
					<div id="sacramentHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('sacramentHymnNumber')}</div>
				</div>
				<div>
					<label htmlFor="sacramentHymnTitle" className="font-medium">Sacrament hymn title</label>
					<input {...inputProps('sacramentHymnTitle')} className={inputClassName} id="sacramentHymnTitle" name="sacramentHymnTitle" defaultValue={value('sacramentHymnTitle', meeting?.sacramentHymn.title ?? '')} />
					<div id="sacramentHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('sacramentHymnTitle')}</div>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="speakers" className="font-medium">Speakers and musical numbers</label>
					<textarea {...inputProps('speakers')} className={inputClassName} id="speakers" name="speakers" rows={4} placeholder="speaker | Name | Topic" defaultValue={value('speakers', meeting?.speakers.map((item) => `${item.type} | ${item.name} | ${item.topic}`).join('\n') ?? '')} />
					<div id="speakers-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('speakers')}</div>
				</div>
				<div>
					<label htmlFor="closingHymnNumber" className="font-medium">Closing hymn number</label>
					<input {...inputProps('closingHymnNumber')} className={inputClassName} id="closingHymnNumber" name="closingHymnNumber" type="number" min="1" defaultValue={value('closingHymnNumber', String(meeting?.closingHymn.number ?? ''))} />
					<div id="closingHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('closingHymnNumber')}</div>
				</div>
				<div>
					<label htmlFor="closingHymnTitle" className="font-medium">Closing hymn title</label>
					<input {...inputProps('closingHymnTitle')} className={inputClassName} id="closingHymnTitle" name="closingHymnTitle" defaultValue={value('closingHymnTitle', meeting?.closingHymn.title ?? '')} />
					<div id="closingHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('closingHymnTitle')}</div>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="closingPrayer" className="font-medium">Closing prayer</label>
					<input {...inputProps('closingPrayer')} className={inputClassName} id="closingPrayer" name="closingPrayer" defaultValue={value('closingPrayer', meeting?.closingPrayer ?? '')} />
					<div id="closingPrayer-error" aria-live="polite" className="mt-1 text-sm text-red-700">{error('closingPrayer')}</div>
				</div>
			</div>
			<p aria-live="polite" className="text-sm text-red-700">{state.message}</p>
			<button className="rounded-lg bg-accent px-5 py-3 font-semibold text-white disabled:opacity-60" type="submit" disabled={isPending}>
				{isPending ? 'Saving...' : meeting ? 'Update meeting' : 'Create meeting'}
			</button>
		</form>
	);
}