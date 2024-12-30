import type { ObjectId } from 'mongodb';

export interface DBUser {
	_id: ObjectId;
	email: string;
	password: string;
	room_ids: ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}
