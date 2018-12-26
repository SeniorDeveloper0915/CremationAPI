import bookshelf 	from '../config/bookshelf';
import Hospital		from './hospital.model';
/**
 * Service model.
 */
class Service extends bookshelf.Model {
    get tableName() {
        return 'service';
    }

    get hasTimestamps() {
        return true;
    }

    Hospital() {
    	return this.belongsTo(Hospital, "Hospital_Id");
    }
}

export default Service;