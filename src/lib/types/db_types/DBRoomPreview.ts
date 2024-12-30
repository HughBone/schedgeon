import type { DBGroupType } from '$lib/types/db_types/DBGroupType';
import type { ObjectId } from 'mongodb';

export interface MemberSample {
	name: string;
	profile_img: string;
}

export interface DBRoomPreview {
	_id: ObjectId;
	roomId: ObjectId;
	name: string;
	memberCount: number;
	memberSample: MemberSample[];
	groupSample: DBGroupType[];
}
