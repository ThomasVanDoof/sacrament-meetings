'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addMeeting, deleteMeeting as deleteMeetingById, updateMeeting as updateMeetingById } from '@/lib/meetings-db';
import { isMeetingDate, parseMeetingId } from '@/lib/meeting-input';
import type { MeetingActionState, SacramentMeeting } from '@/lib/types';

const MeetingFormSchema = z.object({
	date: z.string().refine(isMeetingDate, 'Enter a valid date.'),
	meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
	presiding: z.string().trim().min(1, 'Enter who is presiding.'),
	conducting: z.string().trim().min(1, 'Enter who is conducting.'),
	announcements: z.string(),
	openingHymnNumber: z.string().regex(/^[1-9]\d*$/, 'Enter a positive hymn number.').transform(Number),
	openingHymnTitle: z.string().trim().min(1, 'Enter the opening hymn title.'),
	openingPrayer: z.string().trim().min(1, 'Enter who will offer the opening prayer.'),
	wardBusiness: z.string(),
	stakeBusiness: z.enum(['true', 'false']),
	sacramentHymnNumber: z.string().regex(/^[1-9]\d*$/, 'Enter a positive hymn number.').transform(Number),
	sacramentHymnTitle: z.string().trim().min(1, 'Enter the sacrament hymn title.'),
	speakers: z.string().superRefine((value, context) => {
		for (const [index, line] of value.split('\n').entries()) {
			if (!line.trim()) continue;
			const [type, name, topic, ...extra] = line.split('|').map((part) => part.trim());
			if (!['speaker', 'musical-number'].includes(type) || !name || !topic || extra.length > 0) {
				context.addIssue({
					code: 'custom',
					message: `Entry ${index + 1} must contain a type, name, and topic separated by |.`,
				});
			}
		}
	}),
	closingHymnNumber: z.string().regex(/^[1-9]\d*$/, 'Enter a positive hymn number.').transform(Number),
	closingHymnTitle: z.string().trim().min(1, 'Enter the closing hymn title.'),
	closingPrayer: z.string().trim().min(1, 'Enter who will offer the closing prayer.'),
});

type MeetingFormValues = z.input<typeof MeetingFormSchema>;

function getFormValues(formData: FormData): MeetingFormValues {
	const value = (name: keyof MeetingFormValues) => {
		const entry = formData.get(name);
		return typeof entry === 'string' ? entry : '';
	};

	return {
		date: value('date'),
		meetingType: value('meetingType') as MeetingFormValues['meetingType'],
		presiding: value('presiding'),
		conducting: value('conducting'),
		announcements: value('announcements'),
		openingHymnNumber: value('openingHymnNumber'),
		openingHymnTitle: value('openingHymnTitle'),
		openingPrayer: value('openingPrayer'),
		wardBusiness: value('wardBusiness'),
		stakeBusiness: formData.get('stakeBusiness') === 'true' ? 'true' : 'false',
		sacramentHymnNumber: value('sacramentHymnNumber'),
		sacramentHymnTitle: value('sacramentHymnTitle'),
		speakers: value('speakers'),
		closingHymnNumber: value('closingHymnNumber'),
		closingHymnTitle: value('closingHymnTitle'),
		closingPrayer: value('closingPrayer'),
	};
}

function toMeeting(values: z.output<typeof MeetingFormSchema>): Omit<SacramentMeeting, 'id'> {
	return {
		date: values.date,
		meetingType: values.meetingType,
		presiding: values.presiding,
		conducting: values.conducting,
		announcements: values.announcements.split('\n').map((item) => item.trim()).filter(Boolean),
		openingHymn: { number: values.openingHymnNumber, title: values.openingHymnTitle },
		openingPrayer: values.openingPrayer,
		wardBusiness: values.wardBusiness.split('\n').map((description) => description.trim()).filter(Boolean).map((description) => ({ description })),
		stakeBusiness: values.stakeBusiness === 'true',
		sacramentHymn: { number: values.sacramentHymnNumber, title: values.sacramentHymnTitle },
		speakers: values.speakers.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
			const [type, name, topic] = line.split('|').map((part) => part.trim());
			return { type: type as 'speaker' | 'musical-number', name, topic };
		}),
		closingHymn: { number: values.closingHymnNumber, title: values.closingHymnTitle },
		closingPrayer: values.closingPrayer,
	};
}

function validationState(values: MeetingFormValues, error: z.ZodError): MeetingActionState {
	return {
		message: 'Please correct the highlighted fields.',
		errors: error.flatten().fieldErrors as Record<string, string[]>,
		values: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)])),
	};
}

export async function createMeeting(_previousState: MeetingActionState, formData: FormData): Promise<MeetingActionState> {
	const values = getFormValues(formData);
	const parsed = MeetingFormSchema.safeParse(values);
	if (!parsed.success) return validationState(values, parsed.error);

	try {
		await addMeeting(toMeeting(parsed.data));
	} catch (error) {
		console.error('Failed to create meeting:', error);
		throw new Error('Unable to create the meeting right now. Please try again.');
	}

	revalidatePath('/meetings');
	redirect('/meetings');
}

export async function updateMeeting(id: number, _previousState: MeetingActionState, formData: FormData): Promise<MeetingActionState> {
	const values = getFormValues(formData);
	const parsed = MeetingFormSchema.safeParse(values);
	if (!parsed.success) return validationState(values, parsed.error);

	try {
		await updateMeetingById(id, toMeeting(parsed.data));
	} catch (error) {
		console.error(`Failed to update meeting ${id}:`, error);
		throw new Error('Unable to update the meeting right now. Please try again.');
	}

	revalidatePath('/meetings');
	revalidatePath(`/meetings/${id}`);
	redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
	const id = parseMeetingId(String(formData.get('id') ?? ''));
	if (id === null) throw new Error('A valid meeting ID is required.');

	try {
		await deleteMeetingById(id);
	} catch (error) {
		console.error(`Failed to delete meeting ${id}:`, error);
		throw new Error('Unable to delete the meeting right now. Please try again.');
	}

	revalidatePath('/meetings');
	redirect('/meetings');
}