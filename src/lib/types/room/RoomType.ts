import type { DayType } from '$lib/types/room/DayType';
import type { DBRoom } from '$lib/types/db_types/DBRoom';
import type { TimeSlot } from '$lib/types/room/TimeSlotType';

export interface RoomType extends DBRoom {
	roomDays: DayType[];
	roomDaySlots: [TimeSlot[]];
}
