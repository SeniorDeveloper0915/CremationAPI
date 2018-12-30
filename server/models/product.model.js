import bookshelf 		from '../config/bookshelf';
import Service 			from './service.model';
import PromotionImage   from './promotion_image.model';
import FirstProject 	from './first_level_project.model';


/**
 * Product model.
 */
class Product extends bookshelf.Model {
    get tableName() {
        return 'product';
    }

    get hasTimestamps() {
        return true;
    }

    Promitions() {
        return this.hasMany(PromotionImage, "Product_Id");
    }

    FirstProject() {
    	return this.belongsTo(FirstProject, "First_Project_Id");
    }
}

export default Product;