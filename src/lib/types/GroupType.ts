import type { UUID } from 'crypto';
import type { URL } from 'url';

export interface GroupType {
	id: UUID;
	name: string;
	imgUrl: URL;
}
