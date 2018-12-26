import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import KoreanMedicine           from '../models/korean_medicine.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add New Korean Medicine
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

function AddKoreanMedicine(req, res) {

    KoreanMedicine.forge({
        Title : req.body.title, Content : req.body.content
    }, {hasTimestamps: true}).save()
        .then(korean => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}


/**
 *  Get Korean Medicine by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetKoreanById(req, res) {
    KoreanMedicine.forge({id: 1})
        .fetch()
        .then(korean => {
            if (!korean) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, korean: {}
                });
            }
            else {
                res.json({
                    error: false,
                    korean: korean.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Korean Medicine
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyKorean(req, res) {

    KoreanMedicine.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(korean) {
                if (korean != null)
                    korean.save({
                        Title       : req.body.title        || korean.get('Title'),
                        Content     : req.body.content      || korean.get('Content')
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
                    AddKoreanMedicine(req, res);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
