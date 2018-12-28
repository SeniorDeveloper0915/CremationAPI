import bookshelf 			from '../config/bookshelf';

/**
 * Recruitment model.
 */
class Recruitment extends bookshelf.Model {
    get tableName() {
        return 'recruitment';
    }

    get hasTimestamps() {
        return true;
    }

}

export default Recruitment;