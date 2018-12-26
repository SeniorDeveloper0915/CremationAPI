import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Doctor           from '../models/doctor.model';
import Skill            from '../models/skill.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';



/**
 *  Upload Image
 *
 * @param {object} req
 * @param {object} res
 * @param {string} oldpaht
 * @param {string} newpath
 * @returns {*}
 */

function UploadImage(req, res, oldpath, newpath) {
    fs.rename(oldpath, newpath, function(err) {
        if (err)
            throw err;
        Doctor.forge({
            Photo : newpath
        }, {hasTimestamps: true}).save()
            .then(doctor => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : doctor.id
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: err
                })
            );
    });
}

/**
 *  Change Before Image
 *
 * @param {object} req
 * @param {object} res
 * @param {string} oldpath
 * @param {string} newpath
 * @param {integer} id
 * @returns {*}
 */

function ChangeImage(req, res, oldpath, newpath, id) {
    Doctor.forge({id: id})
    .fetch({require: true})
    .then(function(doctor) {
        if (doctor.get('Photo') != "")
            fs.unlinkSync(doctor.get('Photo'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Doctor.forge({id: id})
                .fetch()
                .then(doctor => doctor.save({
                        Photo : newpath
                    })
                    .then(() => res.json({
                            error   : false,
                            message : "Image Upload Succed"
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
        });
    });
}

/**
 *  Save Skills
 *
 * @param {objectarray} skills
 * @param {integer} doctorId
 * @returns {*}
 */

function SaveSkills(skills, doctorId) {
    Skill.forge({Doctor_Id :  doctorId})
        .fetch()
        .then(function(skill) {
            if (skill != null)
                skill.destroy()
            var i;
            for (i = 0; i < skills.length; i ++) {
                console.log(skills[i].first_project_id);
                Skill.forge({
                    Doctor_Id           : doctorId, 
                    First_Project_Id    : skills[i].first_project_id,
                    Second_Project_Id   : skills[i].second_project_id,
                    Third_Project_Id    : skills[i].third_project_id
                }, {hasTimestamps: true}).save();
            }
        })
}
/**
 *  Save New Doctor
 *
 * @param {object} req
 * @param {object} res
 * @param {string} sel
 * @returns {*}
 */

export function SaveDoctor(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Doctor.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(doctor) {
            doctor.save({
                Doctor_Name         : req.body.doctor_name          || project.get('Doctor_Name'),
                Title_Id            : req.body.title_id             || project.get('Title_Id'),
                Length              : req.body.length               || project.get('Length'),
                Number              : req.body.number               || project.get('Number'),
                Address             : req.body.address              || project.get('Address'),
                Profile             : req.body.profile              || project.get('Profile'),
                Sort                : req.body.sort                 || project.get('Sort'),
                Release_Time        : Release_Time
            })
            .then(function() {
                SaveSkills(req.body.skills, req.body.id);
                res.json({
                        success   : true
                    })
            })
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: err.message}
                })
            )
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Upload Photo
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadPhoto(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.doctor_photo == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.doctor_photo.path;
            var newpath = 'C:/Users/royal/' + files.doctor_photo.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}


/**
 *  Get Doctor by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDoctorById(req, res) {
    Doctor.forge({id: req.params.id})
        .fetch()
        .then(doctor => {
            if (!doctor) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, doctor: {}
                });
            }
            else {
                Skill.forge({Doctor_Id : doctor.get('id')})
                    .fetch({require : true})
                    .then(function(skill) {
                        res.json({
                            error : false,
                            doctor: doctor.toJSON(),
                            skill : skill.toJSON() 
                        });
                    }) 
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: err
                        })
                    );
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Doctor Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Doctor.forge({id: req.params.id})
        .fetch({require: true})
        .then(doctor => doctor.save({
                Status : !doctor.get('Status')
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
 * Get All Doctors
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDoctors(req, res) {
    Doctor.forge()
        .fetchAll({withRelated : ['DoctorTitle', 'Skills']})
        .then(doctors => res.json({
                error: false,
                doctors: doctors.toJSON(),
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Doctor by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteDoctor(req, res) {
    Doctor.forge({id: req.params.id})
        .fetch({require: true})
        .then(function(doctor) {
            Ski
            Skill.forge({Doctor_Id : doctor.get('id')})
                .fetch()
                .then(function(skill) {
                    skill.destroy()
                        .then(function() {
                            doctor.destroy()
                            .then(() => res.json({
                                    error: false,
                                    data: {message: 'Delete Doctor Succed.'}
                                })
                            );
                        });
                })
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: err
                    })
                );
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
