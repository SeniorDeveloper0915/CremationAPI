import bookshelf 		from '../config/bookshelf';
import Doctor 			from './doctor.model';
import FirstProject 	from './first_level_project.model';
import SecondProject 	from './second_level_project.model';
import ThirdProject 	from './third_level_project.model';

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