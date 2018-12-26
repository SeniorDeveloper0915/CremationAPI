import bookshelf 	from '../config/bookshelf';
import Doctor 		from './doctor.model';

/**
 * Skill model.
 */
class Skill extends bookshelf.Model {
    get tableName() {
        return 'skill';
    }

    get hasTimestamps() {
        return true;
    }

    Doctor() {
    	return this.belongsTo(Doctor, 'Doctor_Id');
    }
}

export default Skill;