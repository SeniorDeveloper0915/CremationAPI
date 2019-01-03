import bookshelf 		from '../config/bookshelf';

/**
 * Refund Order model.
 */
class RefundOrder extends bookshelf.Model {
    get tableName() {
        return 'refund_order';
    }

    get hasTimestamps() {
        return true;
    }
}

export default RefundOrder;