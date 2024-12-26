import type { UUID } from 'crypto';
import type { URL } from 'url';
import type { GroupType } from '$lib/types/room/GroupType';
import type { DateRange } from '$lib/types/room/RoomType';

export interface MemberType {
	id: UUID;
	name: string;
	imgUrl: URL;
	groups: GroupType[];
	availability: DateRange[];
}
