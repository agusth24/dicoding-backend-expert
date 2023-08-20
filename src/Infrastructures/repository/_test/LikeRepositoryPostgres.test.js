const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');

describe('LikeRepositoryPostgres', () => {
	afterEach(async () => {
		await ThreadsTableTestHelper.cleanTable();
		await UsersTableTestHelper.cleanTable();
	});

	afterAll(async () => {
		await pool.end();
	});

	describe('addLike function', () => {
		it('should persist add likes and return added length likes correctly', async () => {
			// Arrange
			const userId = 'user-123';
			const threadId = 'thread-123';
			const commentId = 'comment-123';

			const fakeIdGenerator = () => '123'; // stub!
			const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

			// Action
			await UsersTableTestHelper.addUser({id: userId});
			await ThreadsTableTestHelper.addThread({id: threadId});
			await ThreadsTableTestHelper.addComment({commentId, threadId});
			await likeRepositoryPostgres.addLike(commentId, userId);

			// Assert
			const like = await ThreadsTableTestHelper.findLikesById('like-123');
			expect(like).toHaveLength(1);
		});
	});

	describe('verifyLikeOnComment function', () => {
		it('should return verify like on comment false', async () => {
			const userId = 'user-123';
			const threadId = 'thread-123';
			const commentId = 'comment-123';
			const likeId = 'like-123';
			await UsersTableTestHelper.addUser({id: userId});
			await ThreadsTableTestHelper.addThread({id: threadId});
			await ThreadsTableTestHelper.addComment({commentId, threadId, owner: userId});
			await ThreadsTableTestHelper.addLike({likeId, commentId, owner: userId});
			const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});

			// Action & Assert
			const likeOnComment = await likeRepositoryPostgres.verifyLikeOnComment(commentId, 'user-xyz');
			expect(likeOnComment).toStrictEqual(false);
		});

		it('should return verify like on comment true', async () => {
			const userId = 'user-123';
			const threadId = 'thread-123';
			const commentId = 'comment-123';
			const likeId = 'like-123';
			await UsersTableTestHelper.addUser({id: userId});
			await ThreadsTableTestHelper.addThread({id: threadId});
			await ThreadsTableTestHelper.addComment({commentId, threadId, owner: userId});
			await ThreadsTableTestHelper.addLike({likeId, commentId, owner: userId});
			const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});

			// Action & Assert
			const likeOnComment = await likeRepositoryPostgres.verifyLikeOnComment(commentId, userId);
			expect(likeOnComment).toStrictEqual(true);
		});
	});

	describe('editLike function', () => {
		it('should soft delete like from database', async () => {
			const userId = 'user-123';
			const threadId = 'thread-123';
			const commentId = 'comment-123';
			const likeId = 'like-123';
			await UsersTableTestHelper.addUser({id: userId});
			await ThreadsTableTestHelper.addThread({id: threadId});
			await ThreadsTableTestHelper.addComment({commentId, threadId, owner: userId});
			await ThreadsTableTestHelper.addLike({likeId, commentId, owner: userId});
			const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});

			// Action
			await likeRepositoryPostgres.editLike(commentId, userId);

			// Assert
			const like = await ThreadsTableTestHelper.findLikesById(likeId);
			expect(like[0].id).toStrictEqual(likeId);
			expect(like[0].is_deleted).toStrictEqual(true);
		});
	});
});
