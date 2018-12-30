import bookshelf 			from '../config/bookshelf';
import RaiderCategory 		from './raider_category.model';

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

    RaiderCategory() {
    	return this.belongsTo(RaiderCategory, "Category_Id");
    }
}

export default Raider;