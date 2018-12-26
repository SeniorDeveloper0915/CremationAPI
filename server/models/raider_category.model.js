import bookshelf 			from '../config/bookshelf';

/**
 * Raider Category model.
 */
class RaiderCategory extends bookshelf.Model {
    get tableName() {
        return 'raider_category';
    }

    get hasTimestamps() {
        return true;
    }
}

export default RaiderCategory;