import { DB_NAME, DB_PASS, DB_USER } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.vo1yecb.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

export const mongoClient = new MongoClient(MONGODB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

const dbClient = mongoClient.db('test');
export const users = dbClient.collection('users');
export const rooms = dbClient.collection('rooms');
