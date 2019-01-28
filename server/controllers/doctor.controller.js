import HttpStatus       from 'http-status-codes';
import Doctor           from '../models/doctor.model';
import Skill            from '../models/skill.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';
import randomstring     from 'randomstring';


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
                    error   : true,
                    message : "Photo Uploading Succed!",
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
                            message : "Photo Uploading Succed!",
                            id      : doctor.id
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
                        error   : false,
                        message : "New Doctor Succed!"
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
            var filename = randomstring.generate(7);
            var oldpath = files.doctor_photo.path;
            var newpath = 'C:/Users/royal/doctor/' + filename + "_doctor.jpg";

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Doctor Photo
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadPhoto(req, res) {
    Doctor.forge({id :  req.params.id})
        .fetch()
        .then(function(doctor) {
            var path = doctor.toJSON().Photo.toString();
            var stat = fs.statSync(path);
            var total  = stat.size;
            if (req.headers.range) {   // meaning client (browser) has moved the forward/back slider
                                       // which has sent this request back to this server logic ... cool
                    var range = req.headers.range;
                    var parts = range.replace(/bytes=/, "").split("-");
                    var partialstart = parts[0];
                    var partialend = parts[1];

                    var start = parseInt(partialstart, 10);
                    var end = partialend ? parseInt(partialend, 10) : total-1;
                    var chunksize = (end-start)+1;

                    var file = fs.createReadStream(path, {start: start, end: end});
                    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'image/jpeg' });
                    file.pipe(res);

            } else {

                    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'image/jpeg' });
                    fs.createReadStream(path).pipe(res);
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
        .fetch({withRelated: ['DoctorTitle', 'Skills', 'Skills.FirstProject', 'Skills.SecondProject', 'Skills.ThirdProject']})
        .then(doctor => {
            if (!doctor) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, doctor: {}
                });
            }
            else {
                res.json({
                    error : false,
                    doctor: doctor.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get Featured Doctors
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetFeatured(req, res) {
    Doctor.query(function(qb){
        qb.orderBy('Sort', 'DESC');
        qb.limit(10);
    }).fetchAll({

    }).then(function(doctor){
        // process results
        res.json( {
            error :  false,
            doctor :  doctor.toJSON()
        })
    });
}

/**
 *  Get Filtered Doctors
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetFilter(req, res) {
    if (req.body.title != 0) {
        Doctor.query(function(qb) {
            qb.leftJoin(
                'skill',
                'doctor.id',
                'skill.Doctor_Id'
            );
            qb.where('skill.First_Project_Id', '=', req.body.first);
            qb.where('skill.Second_Project_Id', '=', req.body.second);
            qb.where('skill.Third_Project_Id', '=', req.body.third);
            qb.where('doctor.Title_Id', '=', req.body.title);
            qb.groupBy('skill.Doctor_Id');
            qb.limit(req.body.cnt);
            qb.offset(req.body.start * req.body.cnt);
        }).fetchAll().then(doctor => {
            res.json({
                error : false,
                doctor : doctor.toJSON()
            })
        });
    }
    else if (req.body.title == 0 && req.body.first != 0 && req.body.second != 0 && req.body.third != 0) {
        Doctor.query(function(qb) {
            qb.leftJoin(
                'skill',
                'doctor.id',
                'skill.Doctor_Id'
            );
            qb.where('skill.First_Project_Id', '=', req.body.first);
            qb.where('skill.Second_Project_Id', '=', req.body.second);
            qb.where('skill.Third_Project_Id', '=', req.body.third);
            qb.groupBy('skill.Doctor_Id');
            qb.limit(req.body.cnt);
            qb.offset(req.body.start * req.body.cnt);
        }).fetchAll().then(doctor => {
            res.json({
                error : false,
                doctor : doctor.toJSON()
            })
        });
    }
    else if (req.body.third == 0 && req.body.title == 0 && req.body.first != 0 && req.body.second != 0) {
        Doctor.query(function(qb) {
            qb.leftJoin(
                'skill',
                'doctor.id',
                'skill.Doctor_Id'
            );
            qb.where('skill.First_Project_Id', '=', req.body.first);
            qb.where('skill.Second_Project_Id', '=', req.body.second);
            qb.groupBy('skill.Doctor_Id');
            qb.limit(req.body.cnt);
            qb.offset(req.body.start * req.body.cnt);
        }).fetchAll().then(doctor => {
            res.json({
                error : false,
                doctor : doctor.toJSON()
            })
        });
    }
    else if (req.body.second == 0 && req.body.third == 0 && req.body.title == 0 && req.body.first != 0) {
        Doctor.query(function(qb) {
            qb.leftJoin(
                'skill',
                'doctor.id',
                'skill.Doctor_Id'
            );
            qb.where('skill.First_Project_Id', '=', req.body.first);
            qb.groupBy('skill.Doctor_Id');
            qb.limit(req.body.cnt);
            qb.offset(req.body.start * req.body.cnt);
        }).fetchAll().then(doctor => {
            res.json({
                error : false,
                doctor : doctor.toJSON()
            })
        });
    }
    
}

/**
 *  Get Load More
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


export function LoadMore(req, res) {
    Doctor.query(function(qb){
        qb.limit(req.body.cnt);
        qb.offset(req.body.start * req.body.cnt);
    }).fetchAll({
        withRelated: ['DoctorTitle', 'Skills', 'Skills.FirstProject', 'Skills.SecondProject', 'Skills.ThirdProject']
    }).then(function(doctor){
        // process results
        res.json( {
            error :  false,
            doctor :  doctor.toJSON()
        })
    });
}

/**
 *  Get skills by doctor id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetSkills(req, res) {
    Doctor.forge({id: req.params.id})
        .fetch({withRelated: ['DoctorTitle', 'Skills', 'Skills.FirstProject', 'Skills.SecondProject', 'Skills.ThirdProject']})
        .then(doctor => {

            doctor.Skills().fetch().then(function(skills) {
                console.log(skills);
                if (!skills) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, skills: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        skills          : skills.toJSON()
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
 *  Get cases by doctor id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetCases(req, res) {
    Doctor.forge({id: req.params.id})
        .fetch({withRelated: ['Cases']})
        .then(doctor => {

            doctor.Cases().fetch().then(function(cases) {
                console.log(cases);
                if (!cases) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, cases: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        cases           : cases.toJSON()
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
    console.log("GetDoctors");
    Doctor.forge()
        .fetchAll({withRelated: ['DoctorTitle', 'Skills', 'Skills.FirstProject', 'Skills.SecondProject', 'Skills.ThirdProject']})
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
            Skill.forge({Doctor_Id : doctor.get('id')})
                .fetch()
                .then(function(skill) {
                    skill.destroy()
                        .then(function() {
                            doctor.destroy()
                            .then(() => res.json({
                                    error: false,
                                    message: 'Delete Doctor Succed.'
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

/**
 * Get Doctor Count
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Count(req, res) {
    Doctor.count()
        .then(count => res.json({
                error: false,
                count: count
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Search doctors
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function Search(req, res) {
    var search = "%" + req.body.text + "%";
    Doctor.query(function(qb) {
        qb.where('Doctor_Name', 'LIKE', search);
        qb.orWhere('Profile', 'LIKE', search);
        qb.limit(req.body.cnt);
        qb.offset(req.body.start * req.body.cnt);
    }).fetchAll().then(doctor => {
        res.json({
            error : false,
            doctor : doctor.toJSON()
        })
    });
}