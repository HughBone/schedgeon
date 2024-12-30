// See https://svelte.dev/docs/kit/types#app.d.ts

import type { DBUser } from '$lib/types/db_types/DBUser';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Promise<DBUser | undefined> | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
