import bookshelf 			from '../config/bookshelf';
import SecondProject 		from './second_level_project.model';
import ThirdProject 		from './third_level_project.model';
import Skill 				from './skill.model';

/**
 * First Level Project model.
 */
class FirstProject extends bookshelf.Model {
    get tableName() {
        return 'first_project';
    }

    get hasTimestamps() {
        return true;
    }

    SecondProjects() {
    	return this.hasMany(SecondProject, "First_Project_Id");
    }

    ThirdProjects() {
    	return this.hasMany(ThirdProject, "Third_Project_Id");
    }

}

export default FirstProject;