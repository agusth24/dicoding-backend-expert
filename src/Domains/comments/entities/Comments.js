/* eslint-disable camelcase */
class Comments {
	constructor(payload) {
		this._verifyPayload(payload);

		const {id, username, date, is_deleted, content, likecount} = payload;

		this.id = id;
		this.username = username;
		this.date = date;
		this.content = is_deleted ? '**komentar telah dihapus**' : content;
		this.likeCount = parseInt(likecount);
	}

	_verifyPayload({id, username, date, is_deleted, content, likecount}) {
		if (!id || !username || !date || !content || !likecount) {
			throw new Error('COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
		}

		if (typeof id !== 'string' || typeof username !== 'string' || !(date instanceof Date) || typeof content !== 'string' || typeof is_deleted !== 'boolean' || typeof likecount !== 'string') {
			throw new Error('COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
		}
	}
}

module.exports = Comments;
