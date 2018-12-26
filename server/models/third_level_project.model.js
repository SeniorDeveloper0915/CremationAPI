import bookshelf 			from '../config/bookshelf';
import SecondProject 		from './second_level_project.model';
import FirstProject 		from './first_level_project.model';

/**
 * Second Level Project model.
 */
class ThirdProject extends bookshelf.Model {
    get tableName() {
        return 'project';
    }

    get hasTimestamps() {
        return true;
    }

    SecondProject() {
    	return this.belongsTo(SecondProject, "Second_Project_Id");
    }

    FirstProject() {
    	return this.belongsTo(FirstProject, "Third_Project_Id");
    }
}

export default ThirdProject;