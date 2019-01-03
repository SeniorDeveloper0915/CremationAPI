import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import RaiderCategory           from '../models/raider_category.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add New Raider Category
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddCategory(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    RaiderCategory.forge({
        Category_Name : req.body.category_name, Sort : req.body.sort, Release_Time : Release_Time
    }, {hasTimestamps: true}).save()
        .then(category => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}

/**
 *  Get raider category by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetCategoryById(req, res) {
    RaiderCategory.forge({id: req.params.id})
        .fetch()
        .then(category => {
            if (!category) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, category: {}
                });
            }
            else {
                res.json({
                    error: false,
                    category: category.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get raiders by raider category id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetRaiders(req, res) {
    RaiderCategory.forge({id: req.params.id})
        .fetch({withRelated: ['Raiders']})
        .then(category => {

            category.Raiders().fetch().then(function(raiders) {
                console.log(raiders);
                if (!raiders) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, raiders: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        raiders         : raiders.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Raider Category
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyCategory(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    RaiderCategory.forge({id: req.body.id})
        .fetch({require: true})
        .then(category => category.save({
                Category_Name   : req.body.category_name    || category.get('Category_Name'),
                Sort            : req.body.sort             || category.get('Sort'),
                Release_Time    : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Modify Raider Category Succed"
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Change Raider Category Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    RaiderCategory.forge({id: req.params.id})
        .fetch({require: true})
        .then(category => category.save({
                Status : !category.get('Status')
            })
                .then(() => res.json({
                        error   : false,
                        message : "Change Status Succed"
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Get All Raider Categories
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetCategories(req, res) {
    RaiderCategory.forge()
        .fetchAll()
        .then(category => res.json({
                error: false,
                categorys: category.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete raider category by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteCategory(req, res) {
    RaiderCategory.forge({id: req.params.id})
        .fetch({require: true})
        .then(function(category) {
                category.destroy();
            }
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
