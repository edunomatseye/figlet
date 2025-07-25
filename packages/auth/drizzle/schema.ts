import { relations } from 'drizzle-orm'
import { foreignKey, int, numeric, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const Profile = sqliteTable('Profile', {
	id: int('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name')
});

export const Post = sqliteTable('Post', {
	id: int('id').notNull().primaryKey(),
	title: text('title').notNull(),
	content: text('content'),
	published: int('published', { mode: 'boolean' }).notNull(),
	authorId: int('authorId').notNull()
}, (Post) => ({
	'Post_author_fkey': foreignKey({
		name: 'Post_author_fkey',
		columns: [Post.authorId],
		foreignColumns: [Profile.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade')
}));

export const User = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: int('emailVerified', { mode: 'boolean' }).notNull(),
	image: text('image'),
	createdAt: numeric('createdAt').notNull(),
	updatedAt: numeric('updatedAt').notNull()
}, (User) => ({
	'User_email_unique_idx': uniqueIndex('User_email_key')
		.on(User.email)
}));

export const Session = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	expiresAt: numeric('expiresAt').notNull(),
	token: text('token').notNull().unique(),
	createdAt: numeric('createdAt').notNull(),
	updatedAt: numeric('updatedAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId').notNull()
}, (Session) => ({
	'session_user_fkey': foreignKey({
		name: 'session_user_fkey',
		columns: [Session.userId],
		foreignColumns: [User.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade'),
	'Session_token_unique_idx': uniqueIndex('Session_token_key')
		.on(Session.token)
}));

export const Account = sqliteTable('account', {
	id: text('id').notNull().primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId').notNull(),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: numeric('accessTokenExpiresAt'),
	refreshTokenExpiresAt: numeric('refreshTokenExpiresAt'),
	scope: text('scope'),
	password: text('password'),
	createdAt: numeric('createdAt').notNull(),
	updatedAt: numeric('updatedAt').notNull()
}, (Account) => ({
	'account_user_fkey': foreignKey({
		name: 'account_user_fkey',
		columns: [Account.userId],
		foreignColumns: [User.id]
	})
		.onDelete('cascade')
		.onUpdate('cascade')
}));

export const Verification = sqliteTable('verification', {
	id: text('id').notNull().primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: numeric('expiresAt').notNull(),
	createdAt: numeric('createdAt'),
	updatedAt: numeric('updatedAt')
});

export const ProfileRelations = relations(Profile, ({ many }) => ({
	posts: many(Post, {
		relationName: 'PostToProfile'
	})
}));

export const PostRelations = relations(Post, ({ one }) => ({
	author: one(Profile, {
		relationName: 'PostToProfile',
		fields: [Post.authorId],
		references: [Profile.id]
	})
}));

export const UserRelations = relations(User, ({ many }) => ({
	sessions: many(Session, {
		relationName: 'SessionToUser'
	}),
	accounts: many(Account, {
		relationName: 'AccountToUser'
	})
}));

export const SessionRelations = relations(Session, ({ one }) => ({
	user: one(User, {
		relationName: 'SessionToUser',
		fields: [Session.userId],
		references: [User.id]
	})
}));

export const AccountRelations = relations(Account, ({ one }) => ({
	user: one(User, {
		relationName: 'AccountToUser',
		fields: [Account.userId],
		references: [User.id]
	})
}));