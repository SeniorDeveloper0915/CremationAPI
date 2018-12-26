import bookshelf 		from '../config/bookshelf';
import Doctor 			from './doctor.model';

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

    Doctors() {
    	return this.hasMany(Doctor, "Title_Id");
    }
}

export default DoctorTitle;