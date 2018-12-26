import bookshelf from '../config/bookshelf';

/**
 * Banner model.
 */
class Banner extends bookshelf.Model {
    get tableName() {
        return 'banner';
    }

    get hasTimestamps() {
        return true;
    }
}

export default Banner;