import bookshelf 			from '../config/bookshelf';

/**
 * Korean Medicine model.
 */
class Contact extends bookshelf.Model {
    get tableName() {
        return 'contact';
    }

    get hasTimestamps() {
        return true;
    }

}

export default Contact;