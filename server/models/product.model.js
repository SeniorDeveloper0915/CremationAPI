import bookshelf 		from '../config/bookshelf';
import Service 			from './service.model';
import PromotionImage   from './promotion_image.model';


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
}

export default Product;