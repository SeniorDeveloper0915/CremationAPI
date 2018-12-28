import bookshelf from '../config/bookshelf';

/**
 * Guide model.
 */
class Guide extends bookshelf.Model {
    get tableName() {
        return 'guide';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Guide;