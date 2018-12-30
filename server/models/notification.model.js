import bookshelf from '../config/bookshelf';

/**
 * Notification model.
 */
class Notification extends bookshelf.Model {
    get tableName() {
        return 'notification';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Notification;