import bookshelf from '../config/bookshelf';

/**
 * First Level Project model.
 */
class FirstProject extends bookshelf.Model {
    get tableName() {
        return 'first_project';
    }

    get hasTimestamps() {
        return true;
    }
}

export default FirstProject;