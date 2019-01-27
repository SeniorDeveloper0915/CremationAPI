import bookshelf 		from '../config/bookshelf';
import Hospital			from './hospital.model';
import FirstProject 	from './first_level_project.model';
import SecondProject 	from './second_level_project.model';
import ThirdProject 	from './third_level_project.model';
/**
 * Service model.
 */
class Service extends bookshelf.Model {
    get tableName() {
        return 'service';
    }

    get hasTimestamps() {
        return true;
    }

    Hospital() {
    	return this.belongsTo(Hospital, "Hospital_Id");
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

export default Service;