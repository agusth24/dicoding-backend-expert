const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
	constructor(pool, idGenerator) {
		super();
		this._pool = pool;
		this._idGenerator = idGenerator;
	}

	async addLike(commentId, owner) {
		const id = `like-${this._idGenerator()}`;

		const query = {
			text: 'INSERT INTO likes VALUES($1, $2, $3) RETURNING id',
			values: [id, commentId, owner],
		};

		await this._pool.query(query);
	}

	async editLike(commentId, owner) {
		const query = {
			text: `UPDATE likes SET is_deleted = (CASE WHEN is_deleted = FALSE THEN TRUE ELSE FALSE END) WHERE comment_id = $1 AND owner = $2 RETURNING id`,
			values: [commentId, owner],
		};

		await this._pool.query(query);
	}

	async verifyLikeOnComment(commentId, owner) {
		const query = {
			text: 'SELECT id FROM likes WHERE comment_id = $1 AND owner = $2',
			values: [commentId, owner],
		};

		const result = await this._pool.query(query);
		return (result.rowCount === 0) ? false : true;
	}
}

module.exports = LikeRepositoryPostgres;
