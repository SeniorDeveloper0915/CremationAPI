import bookshelf from '../config/bookshelf';

/**
 * Nation model.
 */
class Nation extends bookshelf.Model {
    get tableName() {
        return 'nation';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Nation;