import bookshelf from '../config/bookshelf';

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
}

export default SecondProject;