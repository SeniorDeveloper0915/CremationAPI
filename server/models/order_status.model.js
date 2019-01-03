import bookshelf 		from '../config/bookshelf';
import Hospital 		from './hospital.model';
import Order 			from './order.model';

/**
 * Order Status model.
 */
class OrderStatus extends bookshelf.Model {
    get tableName() {
        return 'order_status';
    }

    get hasTimestamps() {
        return true;
    }

    Orders() {
    	return this.hasMany(Order, "Status_Id");
    }
}

export default OrderStatus;