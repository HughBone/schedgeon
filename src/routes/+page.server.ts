import { loginSchema, registerSchema } from '$lib/schemas/AuthSchema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema)),
		registerForm: await superValidate(zod(registerSchema))
	};
};

export const actions = {
	login: async ({ request }) => {
		const loginForm = await superValidate(request, zod(loginSchema));

		if (!loginForm.valid) return fail(400, { loginForm });

		// TODO: Login user
		return message(loginForm, 'Login form submitted');
	},
	register: async ({ request }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) return fail(400, { registerForm });

		// TODO: Register user
		return message(registerForm, 'Register form submitted');
	}
} satisfies Actions;
