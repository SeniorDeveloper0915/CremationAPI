import bookshelf from '../config/bookshelf';

/**
 * Skill model.
 */
class Skill extends bookshelf.Model {
    get tableName() {
        return 'skill';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Skill;