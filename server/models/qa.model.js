import bookshelf 			from '../config/bookshelf';
import FirstProject 		from './first_level_project.model';
import SecondProject 		from './second_level_project.model';
import ThirdProject 		from './third_level_project.model';
/**
 * Question & Answer model.
 */
class Qa extends bookshelf.Model {
    get tableName() {
        return 'qa';
    }

    get hasTimestamps() {
        return true;
    }

    FirstProject() {
    	return this.belongsTo(FirstProject, "First_Project_Id");
    }

    SecondProject() {
    	return this.belongsTo(SecondProject, "Second_Project_Id");
    }

    ThirdProject() {
    	return this.belongsTo(ThirdProject, "Third_Project_Id");
    }
}

export default Qa;