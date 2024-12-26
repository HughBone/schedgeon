import type { RoomType } from '$lib/types/room/RoomType';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		room: {} as RoomType
	};
};
