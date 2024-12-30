import type { DBDay } from '$lib/types/db_types/DBRoom';
import type { DBGroupType } from '$lib/types/db_types/DBGroupType';
import type { ObjectId } from 'mongodb';

export interface DBMemberOld {
	name: string;
	profile_img: string;
	groups: string[];
	time_slots: number[];
}

export interface DBMember {
	_id: ObjectId;
	name: string;
	profile_img: string;
	groups: DBGroupType[];
	timeRanges: DBDay[];
}
