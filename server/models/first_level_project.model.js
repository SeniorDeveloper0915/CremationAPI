import bookshelf 			from '../config/bookshelf';
import SecondProject 		from './second_level_project.model';
import ThirdProject 		from './third_level_project.model';
import Qa                   from './qa.model';
import Skill                from './skill.model';
import Product              from './product.model';
import Service              from './service.model';

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
        return this.hasMany(Product, "First_Project_Id");
    }

    Skill() {
        return this.hasMany(Skill, "First_Project_Id");
    }

    Service() {
        return this.hasMany(Service, "First_Project_Id");
    }    
} 

export default FirstProject;