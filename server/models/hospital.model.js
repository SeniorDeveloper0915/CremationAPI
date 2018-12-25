import bookshelf from '../config/bookshelf';

/**
 * Hospital model.
 */
class Hospital extends bookshelf.Model {
    get tableName() {
        return 'hospital';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Hospital;