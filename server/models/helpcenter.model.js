import bookshelf 			from '../config/bookshelf';

/**
 * Help Center model.
 */
class HelpCenter extends bookshelf.Model {
    get tableName() {
        return 'help_center';
    }

    get hasTimestamps() {
        return true;
    }

}

export default HelpCenter;