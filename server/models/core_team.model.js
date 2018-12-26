import bookshelf 			from '../config/bookshelf';
import Skill 				from './skill.model';

/**
 * First Level Project model.
 */
class CoreTeam extends bookshelf.Model {
    get tableName() {
        return 'core_team';
    }

    get hasTimestamps() {
        return true;
    }
}

export default CoreTeam;