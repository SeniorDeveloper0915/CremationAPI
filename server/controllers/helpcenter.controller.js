import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import HelpCenter               from '../models/helpcenter.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add Help Center
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

function AddHelpCenter(req, res) {

    HelpCenter.forge({
        Title : req.body.title, Content : req.body.content
    }, {hasTimestamps: true}).save()
        .then(helpcenter => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}


/**
 *  Get Help Center by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetHelpCenterById(req, res) {
    HelpCenter.forge({id: 1})
        .fetch()
        .then(helpcenter => {
            if (!helpcenter) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, helpcenter: {}
                });
            }
            else {
                res.json({
                    error: false,
                    helpcenter: helpcenter.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Help Center
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyHelpCenter(req, res) {

    HelpCenter.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(helpcenter) {
                if (helpcenter != null)
                    helpcenter.save({
                        Title       : req.body.title        || helpcenter.get('Title'),
                        Content     : req.body.content      || helpcenter.get('Content')
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
                    AddHelpCenter(req, res);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
