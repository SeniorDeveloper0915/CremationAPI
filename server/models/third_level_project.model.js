import bookshelf from '../config/bookshelf';

/**
 * Second Level Project model.
 */
class ThirdProject extends bookshelf.Model {
    get tableName() {
        return 'project';
    }

    get hasTimestamps() {
        return true;
    }
}

export default ThirdProject;