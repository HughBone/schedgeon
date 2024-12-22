import type { UUID } from 'crypto';
import type { URL } from 'url';
import type { GroupType } from '$lib/types/GroupType';

export interface MemberType {
	id: UUID;
	name: string;
	imgUrl: URL;
	groups: GroupType[];
}
