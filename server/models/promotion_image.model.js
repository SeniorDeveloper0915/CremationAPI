import bookshelf 			from '../config/bookshelf';
import Hospital             from './hospital.model';
import Product 				from './product.model';

/**
 * Publicity Photo model.
 */
class PromotionImage extends bookshelf.Model {
    get tableName() {
        return 'promotion_image';
    }

    get hasTimestamps() {
        return true;
    }

    Product() {
    	return this.belongsTo(Product, "Proudct_Id");
    }
}

export default PromotionImage;