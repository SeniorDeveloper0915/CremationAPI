import bookshelf from '../config/bookshelf';

/**
 * Dynamic model.
 */
class Dynamic extends bookshelf.Model {
    get tableName() {
        return 'dynamic';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Dynamic;