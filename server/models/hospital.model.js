import bookshelf 		from '../config/bookshelf';
import Service 			from './service.model';
import Team 			from './team.model';
import Case             from './case.model';
import PublicityPhoto	from './publicity_photo.model';

/**
 * Hospital model.
 */
class Hospital extends bookshelf.Model {
    get tableName() {
        return 'hospital';
    }

    get hasTimestamps() {
        return true;
    }

    Services() {
    	return this.hasMany(Service, "Hospital_Id");
    }

    Teams() {
    	return this.hasMany(Team, "Hospital_Id");	
    }

    PublicityPhotos() {
    	return this.hasMany(PublicityPhoto, "Hospital_Id");
    }

    Cases() {
        return this.hasMany(Case, "Hospital_Id");
    }

}

export default Hospital;