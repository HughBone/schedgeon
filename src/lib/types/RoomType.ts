import type { GroupType } from '$lib/types/GroupType';
import type { UUID } from 'crypto';

export interface RoomType {
	id: UUID;
	name: string;
	groups: GroupType[];
}
