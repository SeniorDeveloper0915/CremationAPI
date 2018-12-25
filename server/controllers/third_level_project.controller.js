import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import ThirdProject     from '../models/third_level_project.model';
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
 * @param {integer} bef_eff
 * @returns {*}
 */

function UploadImage(req, res, oldpath, newpath, bef_eff) {
    fs.rename(oldpath, newpath, function(err) {
        if (err)
            throw err;
        if (bef_eff == 0) {
            ThirdProject.forge({
                Before_Img : newpath
            }, {hasTimestamps: true}).save()
                .then(project => res.json({
                        success : true,
                        message : "Image Uploading Succed!",
                        id      : project.id
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: err
                    })
                );
        } else if (bef_eff == 1) {
            ThirdProject.forge({
                Effect_Img : newpath
            }, {hasTimestamps: true}).save()
                .then(project => res.json({
                        success : true,
                        message : "Image Uploading Succed!",
                        id      : project.id
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: err
                    })
                );
        }
        
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
 * @param {integer} bef_eff
 * @returns {*}
 */

function ChangeImage(req, res, oldpath, newpath, id, bef_eff) {
    ThirdProject.forge({id: id})
    .fetch({require: true})
    .then(function(project) {
        if (bef_eff == 0) {
            if (project.get('Before_Img') != "")
                fs.unlinkSync(project.get('Before_Img'));
            fs.rename(oldpath, newpath, function(err) {
                if (err)
                    throw err;
                ThirdProject.forge({id: id})
                    .fetch()
                    .then(project => project.save({
                            Before_Img : newpath
                        })
                        .then(() => res.json({
                                error   : false,
                                message : "IMage Upload Succed"
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
        } else {
            if (project.get('Effect_Img') != "") {
                fs.unlinkSync(project.get('Effect_Img'));
            }
            fs.rename(oldpath, newpath, function(err) {
                if (err)
                    throw err;
                ThirdProject.forge({id: id})
                    .fetch()
                    .then(project => project.save({
                                Effect_Img : newpath
                            })
                            .then(() => res.json({
                                    error   : false,
                                    message : "IMage Upload Succed"
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
        }
    });
}

/**
 *  Change Before Image
 *
 * @param {object} req
 * @param {object} res
 * @param {string} sel
 * @returns {*}
 */

export function SaveProject(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    ThirdProject.forge({id: req.body.id})
        .fetch({require: true})
        .then(project => project.save({
                First_Project_Id    : req.body.first_id             || project.get('First_Project_Id'),
                Second_Project_Id   : req.body.second_id            || project.get('Second_Project_Id'),
                Project_Name        : req.body.project_name         || project.get('Project_Name'),
                Project_Alias       : req.body.project_alias        || project.get('Project_Alias'),
                Description         : req.body.description          || project.get('Description'),
                Features            : req.body.featuers             || project.get('Features'),
                Efficiency          : req.body.efficiency           || project.get('Efficiency'),
                Proposed_Price      : req.body.proposed_price       || project.get('Proposed_Price'),
                Aesthetic_standard  : req.body.aesthetic_standard   || project.get('Aesthetic_standard'),                                
                Advantages          : req.body.advantages           || project.get('Advantages'),
                Shortcoming         : req.body.shortcoming          || project.get('Shortcoming'),
                Suitable            : req.body.suitable             || project.get('suitable'),
                Risk_Warning        : req.body.risk_warning         || project.get('Risk_Warning'),
                Pre_Precautions     : req.body.pre_precautions      || project.get('Pre_Precautions'),
                Care_considerations : req.body.care_considerations  || project.get('Care_considerations'),
                Effects_Treatment   : req.body.effects_treatment    || project.get('Effects_Treatment'),
                Sort                : req.body.sort                 || project.get('Sort'),
                Release_Time        : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Succed"
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
 * Upload Before Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadBeforeImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.before_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.before_image.path;
            var newpath = 'C:/Users/royal/' + files.before_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath, 0);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id, 0);
            }
        }
    });
}

/**
 * Upload Effect Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadEffectImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.effect_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.effect_image.path;
            var newpath = 'C:/Users/royal/' + files.effect_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath, 1);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id, 1);
            }
        }
    });
}

/**
 *  Get second level project by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjectById(req, res) {
    ThirdProject.forge({id: req.params.id})
        .fetch()
        .then(project => {
            if (!project) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, project: {}
                });
            }
            else {
                res.json({
                    error: false,
                    project: project.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get second level project id by Name
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjectIdByName(req, res) {
    SecondProject.forge({Project_Name: req.params.name})
        .fetch()
        .then(project => {
            if (!project) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, id: {}
                });
            }
            else {
                res.json({
                    error: false,
                    id   : project.get('id')
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Change Third Level Project Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    ThirdProject.forge({id: req.params.id})
        .fetch({require: true})
        .then(project => project.save({
                Status : !project.get('Status')
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
 * Get All Third Level Projects
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProjects(req, res) {
    ThirdProject.forge()
        .fetchAll()
        .then(project => res.json({
                error: false,
                projects: project.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Second Level Project by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteProject(req, res) {
    ThirdProject.forge({id: req.params.id})
        .fetch({require: true})
        .then(project => project.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Third Level Project Succed.'}
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
