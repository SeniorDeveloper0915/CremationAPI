import bookshelf 			from '../config/bookshelf';
import SecondProject 		from './second_level_project.model';
import ThirdProject 		from './third_level_project.model';
import Qa                   from './qa.model';
import Product              from './product.model';

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
    	return this.hasMany(ThirdProject, "First_Project_Id");
    }

    Questions() {
        return this.hasMany(Qa, "First_Project_Id");
    }

    Products() {
        return this.hasMany(Project, "First_Project_Id");
    }
} 

export default FirstProject;