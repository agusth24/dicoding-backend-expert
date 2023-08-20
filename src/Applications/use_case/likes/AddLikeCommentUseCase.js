class AddLikeCommentUseCase {
	constructor({threadRepository, commentRepository, likeRepository}) {
		this._threadRepository = threadRepository;
		this._commentRepository = commentRepository;
		this._likeRepository = likeRepository;
	}

	async execute(threadId, commentId, credentialId) {
		await this._threadRepository.verifyThread(threadId);
		await this._commentRepository.verifyComment(commentId);
		await this._commentRepository.verifyCommentOnThread(commentId, threadId);
		const likeOnComment = await this._likeRepository.verifyLikeOnComment(commentId, credentialId);
		likeOnComment ?
			await this._likeRepository.editLike(commentId, credentialId) :
			await this._likeRepository.addLike(commentId, credentialId);
	}
}

module.exports = AddLikeCommentUseCase;
