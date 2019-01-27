import bookshelf 		from '../config/bookshelf';
import Hospital 		from './hospital.model';
import Doctor			from './doctor.model';

/**
 * Team model.
 */
class Team extends bookshelf.Model {
    get tableName() {
        return 'team';
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

export default Team;