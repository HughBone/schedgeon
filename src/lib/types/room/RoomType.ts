import type { UUID } from 'crypto';
import type { GroupType } from '$lib/types/room/GroupType';
import type { MemberType } from '$lib/types/room/MemberType';

export interface DateRange {
	start: Date;
	end: Date;
}

export interface RoomType {
	id: UUID;
	name: string;
	groups: GroupType[];
	members: MemberType[];
	dates: DateRange;
}
