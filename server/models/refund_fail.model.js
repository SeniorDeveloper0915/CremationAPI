import bookshelf 		from '../config/bookshelf';

/**
 * Refund Fail model.
 */
class RefundFail extends bookshelf.Model {
    get tableName() {
        return 'refund_fail';
    }

    get hasTimestamps() {
        return true;
    }
}

export default RefundFail;