import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import ThirdProject     from '../models/third_level_project.model';
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
                        error   : false,
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
                        error   : false,
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
                                message : "Image Uploading Succed!",
                                id      : id
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
                                    message : "Image Uploading Succed!",
                                    id      : id
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
                Features            : req.body.features             || project.get('Features'),
                Efficiency          : req.body.efficiency           || project.get('Efficiency'),
                Proposed_Price      : req.body.proposed_price       || project.get('Proposed_Price'),
                Time_Period         : req.body.time_period          || project.get('Time_Period'),
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
                        message : "Save Third Level Project Succed!"
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

            var fileName = randomstring.generate(7);
            var oldpath = files.before_image.path;
            var newpath = 'C:/Users/royal/project/' + fileName + "_before.jpg";

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath, 0);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id, 0);
            }
        }
    });
}

/**
 * Download Before Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadBeforeImage(req, res) {
    ThirdProject.forge({id :  req.params.id})
        .fetch()
        .then(function(project) {
            var path = project.toJSON().Before_Img.toString();
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
            var fileName = randomstring.generate(7);
            var oldpath = files.effect_image.path;
            var newpath = 'C:/Users/royal/project/' + fileName + "_effect.jpg";

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath, 1);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id, 1);
            }
        }
    });
}

/**
 * Download Effect Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadEffectImage(req, res) {
    ThirdProject.forge({id :  req.params.id})
        .fetch()
        .then(function(project) {
            var path = project.toJSON().Effect_Img.toString();
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
 *  Get questions by first project id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetQuestions(req, res) {
    ThirdProject.forge({id: req.params.id})
        .fetch({withRelated: ['Questions']})
        .then(project => {

            project.Questions().fetch().then(function(questions) {
                console.log(questions);
                if (!questions) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, questions: {}
                    });
                }
                else {
                    res.json({
                        error               : false,
                        questions           : questions.toJSON()
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
 *  Get products by first project id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetProduct(req, res) {
    ThirdProject.forge({id: req.params.id})
        .fetch({withRelated: ['Products']})
        .then(project => {

            project.Products().fetch().then(function(products) {
                if (!products) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, products: {}
                    });
                }
                else {
                    res.json({
                        error               : false,
                        products            : products.toJSON()
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
 * Get Project Count
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Count(req, res) {
    ThirdProject.count()
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
                    message: 'Delete Third Level Project Succed.'
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
