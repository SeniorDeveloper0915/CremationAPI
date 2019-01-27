import bookshelf 		from '../config/bookshelf';
import DoctorTitle 		from './doctor_title.model';
import Skill 			from './skill.model';
import FirstProject     from './first_level_project.model';
import Case             from './case.model';
import Nation           from './nation.model';
import Team             from './team.model';

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

    Team() {
        return this.hasMany(Team, "Doctor_Id");
    }
}

export default Doctor;