import bookshelf from '../config/bookshelf';

/**
 * Industry model.
 */
class Industry extends bookshelf.Model {
    get tableName() {
        return 'industry';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Industry;