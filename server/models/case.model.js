import bookshelf 		from '../config/bookshelf';
import Hospital 		from './hospital.model';
import Doctor 			from './doctor.model';

/**
 * Case Title model.
 */
class Case extends bookshelf.Model {
    get tableName() {
        return 'hospital_case';
    }

    get hasTimestamps() {
        return true;
    }

    Hospital() {
    	return this.belongsTo(Hospital, "Hospital_Id");
    }
    
    Doctor() {
    	return this.belongsTo(Doctor, "Doctor_Id");
    }
}

export default Case;