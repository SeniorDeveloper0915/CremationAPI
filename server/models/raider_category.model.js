import bookshelf 			from '../config/bookshelf';
import Raider 				from './raider.model';

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

    Raiders() {
    	this.hasMany(Raider, "Category_Id");
    }
}

export default RaiderCategory;