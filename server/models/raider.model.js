import bookshelf 			from '../config/bookshelf';

/**
 * Raider model.
 */
class Raider extends bookshelf.Model {
    get tableName() {
        return 'raider';
    }

    get hasTimestamps() {
        return true;
    }

}

export default Raider;