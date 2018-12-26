import bookshelf 		from '../config/bookshelf';
import Hospital 		from './hospital.model';

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
}

export default Team;