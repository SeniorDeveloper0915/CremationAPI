import bookshelf 		from '../config/bookshelf';
import DoctorTitle 		from './doctor_title.model';
import Skill 			from './skill.model';
import Case             from './case.model';

/**
 * Doctor Title model.
 */
class Doctor extends bookshelf.Model {
    get tableName() {
        return 'doctor';
    }

    get hasTimestamps() {
        return true;
    }

    DoctorTitle() {
    	return this.belongsTo(DoctorTitle, 'Title_Id');
    }

    Skills() {
    	return this.hasMany(Skill, 'Doctor_Id');
    }

    Cases() {
        return this.hasMany(Case, "Doctor_Id");
    }
}

export default Doctor;