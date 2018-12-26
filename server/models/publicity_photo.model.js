import bookshelf 			from '../config/bookshelf';
import Hospital             from './hospital.model';

/**
 * Publicity Photo model.
 */
class PublicityPhoto extends bookshelf.Model {
    get tableName() {
        return 'publicity_photo';
    }

    get hasTimestamps() {
        return true;
    }

    Hospital() {
        return this.belongsTo(Hospital, "Hospital_Id");
    }
}

export default PublicityPhoto;