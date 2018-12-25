import bookshelf from '../config/bookshelf';

/**
 * Doctor Title model.
 */
class Doctor extends bookshelf.Model {
    get tableName() {
        return 'doctor';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Doctor;