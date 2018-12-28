import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import CopyRight                from '../models/copyright.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add Copy  Right
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

function AddCopyRight(req, res) {

    CopyRight.forge({
        Title : req.body.title, Content : req.body.content
    }, {hasTimestamps: true}).save()
        .then(copyright => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}


/**
 *  Get Copy Right by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetCopyRightById(req, res) {
    CopyRight.forge({id: 1})
        .fetch()
        .then(copyright => {
            if (!copyright) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, copyright: {}
                });
            }
            else {
                res.json({
                    error: false,
                    copyright: copyright.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Copy Right
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyCopyRight(req, res) {

    CopyRight.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(copyright) {
                if (copyright != null)
                    copyright.save({
                        Title       : req.body.title        || copyright.get('Title'),
                        Content     : req.body.content      || copyright.get('Content')
                    })
                    .then(() => res.json({
                            error   : false,
                            message : "Modify First Level Project Succed"
                        })
                    )
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: true,
                            data: {message: err.message}
                        })
                    )
                else
                    AddCopyRight(req, res);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
