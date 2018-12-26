import bookshelf 			from '../config/bookshelf';

/**
 * Korean Medicine model.
 */
class KoreanMedicine extends bookshelf.Model {
    get tableName() {
        return 'korean_medicine';
    }

    get hasTimestamps() {
        return true;
    }

}

export default KoreanMedicine;