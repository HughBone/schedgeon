import type { UUID } from 'crypto';

export interface UserType {
	id: UUID;
	name: string;
	roomIds: UUID[];
}
