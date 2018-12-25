import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import DoctorTitle      from '../models/doctor_title.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';


/**
 * Add New Doctor Title
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddDoctorTitle(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    DoctorTitle.forge({
        Doctor_Title : req.body.doctor_title, Sort : req.body.sort, Release_Time : Release_Time
    }, {hasTimestamps: true}).save()
        .then(doctor_title => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}


/**
 *  Get doctor title by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDoctorTitleById(req, res) {
    DoctorTitle.forge({id: req.params.id})
        .fetch()
        .then(doctor_title => {
            if (!doctor_title) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, doctor_title: {}
                });
            }
            else {
                res.json({
                    error: false,
                    doctor_title: doctor_title.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Doctor Title
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyDoctorTitle(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    DoctorTitle.forge({id: req.body.id})
        .fetch({require: true})
        .then(doctor_title => doctor_title.save({
                Doctor_Title: req.body.doctor_title || doctor_title.get('Doctor_Title'),
                Sort        : req.body.sort         || doctor_title.get('Sort'),
                Release_Time: Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Modify Doctor Title Succed"
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
 * Get All Doctor Titles
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDoctorTitles(req, res) {
    DoctorTitle.forge()
        .fetchAll()
        .then(doctor_titles => res.json({
                error: false,
                doctor_titles: doctor_titles.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Doctor Title by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteDoctorTitle(req, res) {
    DoctorTitle.forge({id: req.params.id})
        .fetch({require: true})
        .then(doctor_title => doctor_title.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Doctor Title Succed.'}
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
