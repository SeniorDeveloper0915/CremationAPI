import bookshelf 			from '../config/bookshelf';

/**
 * Korean Medicine model.
 */
class ContactUs extends bookshelf.Model {
    get tableName() {
        return 'contact';
    }

    get hasTimestamps() {
        return true;
    }

}

export default ContactUs;