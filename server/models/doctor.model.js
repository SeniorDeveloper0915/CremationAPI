import bookshelf 		from '../config/bookshelf';
import DoctorTitle 		from './doctor_title.model';
import Skill 			from './skill.model';
import Case             from './case.model';
import Nation           from './nation.model';

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

    Nation() {
        return this.belongsTo(Nation, "Address");
    }
}

export default Doctor;