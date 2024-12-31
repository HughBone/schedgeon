import { loginSchema, registerSchema } from '$lib/schemas/AuthSchema';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, type Actions } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users, mongoClient } from '$lib/server/mongodb';

export const actions = {
	login: async ({ request, cookies }) => {
		const loginForm = await superValidate(request, zod(loginSchema));

		if (!loginForm.valid) return fail(400, { loginForm });

		try {
			await mongoClient.connect();
			const user = await users.findOne({ email: loginForm.data.email });
			if (user === null) {
				return setError(loginForm, 'email', "We couldn't find you. Sorry :(");
			}

			if (await bcrypt.compare(loginForm.data.password, user.password)) {
				// Create JWT with user id
				const token = jwt.sign(user._id.toString(), JWT_SECRET);

				cookies.set('token', token, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					path: '/',
					maxAge: 2592000 // 30 days
				});

				return message(loginForm, 'Logged in!');
			}
		} finally {
			// Need to close db
			// NOTE: Always executes after try return
			await mongoClient.close();
		}
	},
	register: async ({ request }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) return fail(400, { registerForm });

		// check if email in use

		// TODO: Register user
		return message(registerForm, 'Register form submitted');
	}
} satisfies Actions;
