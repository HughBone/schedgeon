import { JWT_SECRET } from '$env/static/private';
import { mongoClient, users } from '$lib/server/mongodb';
import type { DBUser } from '$lib/types/db_types/DBUser';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const getUserFromDB = async (userId: string) => {
	try {
		await mongoClient.connect();

		const user = await users.findOne({ _id: new ObjectId(userId) });
		if (user !== null) {
			console.log('user found');
			return user as DBUser;
		} else {
			console.log('user not found');
		}
	} finally {
		await mongoClient.close();
	}
};

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token) {
		console.log('token found');
		try {
			const userId = jwt.verify(token, JWT_SECRET);

			if (userId !== undefined && userId !== null && typeof userId === 'string') {
				console.log('jwt is valid');
				event.locals.user = getUserFromDB(userId as string);
			}
		} catch (err) {
			// Invalid token
		}
	}

	return resolve(event);
};
