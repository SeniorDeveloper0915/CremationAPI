import bookshelf 			from '../config/bookshelf';
import FirstProject 		from './first_level_project.model';
import ThirdProject 		from './third_level_project.model';

/**
 * Second Level Project model.
 */
class SecondProject extends bookshelf.Model {
    get tableName() {
        return 'second_project';
    }

    get hasTimestamps() {
        return true;
    }

    FirstProject() {
    	return this.belongsTo(FirstProject, "First_Project_Id");
    }

    ThirdProjects() {
    	return this.hasMany(ThirdProject, "Second_Project_Id");
    }
}

export default SecondProject;