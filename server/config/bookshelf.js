import bookshelf from 'bookshelf';
import knex from './knex';

bookshelf(knex).plugin(require('bookshelf-eloquent'));
export default bookshelf(knex);