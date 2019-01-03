import bookshelf 		from '../config/bookshelf';
import OrderStatus 		from './order_status.model';
/**
 * Order model.
 */
class Order extends bookshelf.Model {
    get tableName() {
        return 'nation';
    }

    get hasTimestamps() {
        return true;
    }

    OrderStatus() {
    	return this.belongsTo(OrderStatus, "Status_Id");
    }
}

export default Order;