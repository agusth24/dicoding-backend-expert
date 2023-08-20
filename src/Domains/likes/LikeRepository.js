class LikeRepository {
	async addLike(payload) {
		throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async editLike(payload) {
		throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async verifyLikeOnComment(commentId) {
		throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}
}

module.exports = LikeRepository;
