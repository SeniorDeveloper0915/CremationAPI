import bookshelf 			from '../config/bookshelf';
import FirstProject 		from './first_level_project.model';
import ThirdProject 		from './third_level_project.model';
import Qa                   from './qa.model';
import Product              from './product.model';
import Skill                from './skill.model';
import Service              from './service.model';
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

    Questions() {
        return this.hasMany(Qa, "Second_Project_Id");
    }

    Products() {
        return this.hasMany(Product, "First_Project_Id");
    }

    Skill() {
        return this.hasMany(Skill, "Second_Project_Id");
    }

    Service() {
        return this.hasMany(Service, "Second_Project_Id");
    }
}

export default SecondProject;