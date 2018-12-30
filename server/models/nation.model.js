import bookshelf 		from '../config/bookshelf';
import Doctor 			from './doctor.model';
/**
 * Nation model.
 */
class Nation extends bookshelf.Model {
    get tableName() {
        return 'nation';
    }

    get hasTimestamps() {
        return true;
    }

    Doctors() {
    	return this.hasMany(Doctor, "Address");
    }
}

export default Nation;