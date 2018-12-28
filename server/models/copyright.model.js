import bookshelf 			from '../config/bookshelf';

/**
 * Copy Right model.
 */
class CopyRight extends bookshelf.Model {
    get tableName() {
        return 'copy_right';
    }

    get hasTimestamps() {
        return true;
    }

}

export default CopyRight;