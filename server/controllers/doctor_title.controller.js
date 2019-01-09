import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import DoctorTitle      from '../models/doctor_title.model';
import Doctor           from '../models/doctor.model';
import Skill            from '../models/skill.model';
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
                error   : false,
                message : "Save New Doctor Title Succed!" 
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
 *  Get doctors by doctor title id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetDoctors(req, res) {
    DoctorTitle.forge({id: req.params.id})
        .fetch({withRelated: ['Doctors']})
        .then(title => {

            title.Doctors().fetch().then(function(doctors) {
                console.log(doctors);
                if (!doctors) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, doctors: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        doctors         : doctors.toJSON()
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
        .fetchAll({withRelated : ['Doctors', 'Doctors.Skills']})
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
    console.log(req.params.id);
    DoctorTitle.forge({id: req.params.id})
        .fetch()
        .then(function(doctor_title) {
            if (doctor_title != null) {
                console.log(doctor_title.get('id'));
                DoctorTitle.where('id', req.params.id)
                        .destroy();
                Doctor.where('Title_Id', req.params.id)
                        .fetchAll({require : true})
                        .then(function(doctors) {
                            if (doctors != null) {                        
                                var length = doctors.toJSON().length;
                                for (var i = 0; i < length; i ++) {
                                    Doctor.forge({id : doctors.toJSON()[i].id})
                                        .fetch({require: true})
                                        .then(doctor => fs.unlinkSync(doctor.get('Photo')));

                                    Skill.where('Doctor_Id', doctors.toJSON()[i].id)
                                        .fetchAll({require : true})
                                        .then(function(skills) {
                                            if (skills != null) {
                                                Doctor.where('Title_Id', req.params.id)
                                                    .destroy();
                                                Skill.where('Doctor_Id', skills.toJSON()[0].Doctor_Id)
                                                    .destroy();
                                                res.send({
                                                    error   : false,
                                                    message : "Delete Doctor Title Succed!"
                                                })
                                            }
                                        })
                                }
                            }
                        })
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
