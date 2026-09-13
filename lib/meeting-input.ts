const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ID_PATTERN = /^[1-9]\d*$/;

export function parseMeetingId(value: string): number | null {
	if (!ID_PATTERN.test(value)) return null;

	const id = Number(value);
	return Number.isSafeInteger(id) ? id : null;
}

export function isMeetingDate(value: string): boolean {
	if (!DATE_PATTERN.test(value)) return false;

	const [year, month, day] = value.split('-').map(Number);
	const date = new Date(Date.UTC(year, month - 1, day));

	return date.getUTCFullYear() === year
		&& date.getUTCMonth() === month - 1
		&& date.getUTCDate() === day;
}