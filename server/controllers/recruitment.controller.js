import HttpStatus               from 'http-status-codes';
import Recruitment              from '../models/recruitment.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add Recruitment
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

function AddRecruitment(req, res) {

    Recruitment.forge({
        Link : req.body.link
    }, {hasTimestamps: true}).save()
        .then(recruitment => res.json({
                error   : false,
                message : "Save Recruitment Succed!"
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}


/**
 *  Get Recruitment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetRecruitmentById(req, res) {
    Recruitment.forge()
        .fetch()
        .then(recruitment => {
            if (!recruitment) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, recruitment: {}
                });
            }
            else {
                res.json({
                    error: false,
                    recruitment: recruitment.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Recruitment
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyRecruitment(req, res) {

    Recruitment.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(recruitment) {
                if (recruitment != null)
                    recruitment.save({
                        Link       : req.body.link        || recruitment.get('Link')
                    })
                    .then(() => res.json({
                            error   : false,
                            message : "Save Recruitment Succed!"
                        })
                    )
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: true,
                            data: {message: err.message}
                        })
                    )
                else
                    AddRecruitment(req, res);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
