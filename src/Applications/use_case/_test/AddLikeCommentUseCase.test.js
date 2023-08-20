const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const AddLikeCommentUseCase = require('../likes/AddLikeCommentUseCase');

describe('AddLikeCommentUseCase', () => {
	/**
	 * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
	 */
	it('should orchestrating the add likes action correctly', async () => {
		// Arrange
		const threadId = 'thread-123';
		const commentId = 'comment-123';
		const owner = 'user-123';

		/** creating dependency of use case */
		const mockThreadRepository = new ThreadRepository();
		const mockCommentRepository = new CommentRepository();
		const mockLikeRepository = new LikeRepository();

		/** mocking needed function */
		mockThreadRepository.verifyThread = jest.fn()
			.mockImplementation(() => Promise.resolve());
		mockCommentRepository.verifyComment = jest.fn()
			.mockImplementation(() => Promise.resolve());
		mockCommentRepository.verifyCommentOnThread = jest.fn()
			.mockImplementation(() => Promise.resolve());
		mockLikeRepository.verifyLikeOnComment = jest.fn()
			.mockImplementation(() => Promise.resolve(false));
		mockLikeRepository.addLike = jest.fn()
			.mockImplementation(() => Promise.resolve());

		/** creating use case instance */
		const addLikeCommentUseCase = new AddLikeCommentUseCase({
			threadRepository: mockThreadRepository,
			commentRepository: mockCommentRepository,
			likeRepository: mockLikeRepository,
		});

		// Action
		await addLikeCommentUseCase.execute(threadId, commentId, owner);

		// Assert
		expect(mockThreadRepository.verifyThread).toBeCalledWith(threadId);
		expect(mockCommentRepository.verifyComment).toBeCalledWith(commentId);
		expect(mockCommentRepository.verifyCommentOnThread).toBeCalledWith(commentId, threadId);
		expect(mockLikeRepository.verifyLikeOnComment).toBeCalledWith(commentId, owner);
		expect(mockLikeRepository.addLike).toBeCalledWith(commentId, owner);
	});

	it('should orchestrating the edit likes action correctly', async () => {
		// Arrange
		const threadId = 'thread-123';
		const commentId = 'comment-123';
		const owner = 'user-123';

		/** creating dependency of use case */
		const mockThreadRepository = new ThreadRepository();
		const mockCommentRepository = new CommentRepository();
		const mockLikeRepository = new LikeRepository();

		/** mocking needed function */
		mockThreadRepository.verifyThread = jest.fn()
			.mockImplementation(() => Promise.resolve());
		mockCommentRepository.verifyComment = jest.fn()
			.mockImplementation(() => Promise.resolve());
		mockCommentRepository.verifyCommentOnThread = jest.fn()
			.mockImplementation(() => Promise.resolve());
		mockLikeRepository.verifyLikeOnComment = jest.fn()
			.mockImplementation(() => Promise.resolve(true));
		mockLikeRepository.editLike = jest.fn()
			.mockImplementation(() => Promise.resolve());

		/** creating use case instance */
		const addLikeCommentUseCase = new AddLikeCommentUseCase({
			threadRepository: mockThreadRepository,
			commentRepository: mockCommentRepository,
			likeRepository: mockLikeRepository,
		});

		// Action
		await addLikeCommentUseCase.execute(threadId, commentId, owner);

		// Assert
		expect(mockThreadRepository.verifyThread).toBeCalledWith(threadId);
		expect(mockCommentRepository.verifyComment).toBeCalledWith(commentId);
		expect(mockCommentRepository.verifyCommentOnThread).toBeCalledWith(commentId, threadId);
		expect(mockLikeRepository.verifyLikeOnComment).toBeCalledWith(commentId, owner);
		expect(mockLikeRepository.editLike).toBeCalledWith(commentId, owner);
	});
});
