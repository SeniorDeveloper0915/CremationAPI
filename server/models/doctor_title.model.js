import bookshelf from '../config/bookshelf';

/**
 * Doctor Title model.
 */
class DoctorTitle extends bookshelf.Model {
    get tableName() {
        return 'doctor_title';
    }

    get hasTimestamps() {
        return true;
    }
}

export default DoctorTitle;