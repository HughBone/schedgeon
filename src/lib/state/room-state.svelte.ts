import { getContext, setContext } from 'svelte';
import _ from 'lodash';
import { MyState } from '$lib/state/_my-state.svelte';
import { type RoomType } from '$lib/types/RoomType';

class RoomState extends MyState {
	constructor(room: Promise<RoomType>) {
		super();
		room.then((data) => {
			this.loaded = true;
			this.originalData = data;
		});
	}
}

const ROOM_STATE_KEY = Symbol('ROOM_STATE_KEY');

export function setRoomState(room: Promise<RoomType>) {
	return setContext(ROOM_STATE_KEY, new RoomState(room));
}

export function getRoomState() {
	return getContext<ReturnType<typeof setRoomState>>(ROOM_STATE_KEY);
}
