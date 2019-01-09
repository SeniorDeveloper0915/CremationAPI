import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Hospital         from '../models/hospital.model';
import PublicityPhoto   from '../models/publicity_photo.model';
import Service          from '../models/service.model';
import Team             from '../models/team.model';
import Case             from '../models/case.model';
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
        Hospital.forge({
            Logo : newpath
        }, {hasTimestamps: true}).save()
            .then(hospital => res.json({
                    error   : false,
                    message : "Image Uploading Succed!",
                    id      : hospital.id
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: err
                })
            );
    });
}


/**
 *  Change Image
 *
 * @param {object} req
 * @param {object} res
 * @param {string} oldpath
 * @param {string} newpath
 * @param {integer} id
 * @returns {*}
 */

function ChangeImage(req, res, oldpath, newpath, id) {
    Hospital.forge({id: id})
    .fetch({require: true})
    .then(function(hospital) {
        if (hospital.get('Logo') != "")
            fs.unlinkSync(hospital.get('Logo'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Hospital.forge({id: id})
                .fetch()
                .then(hospital => hospital.save({
                        Logo : newpath
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
    });
}

/**
 *  Change New Hospital
 *
 * @param {object} req
 * @param {object} res
 * @param {string} sel
 * @returns {*}
 */

export function SaveHospital(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Hospital.forge({id: req.body.id})
        .fetch({require: true})
        .then(hospital => hospital.save({
                Hospital_Name           : req.body.hospital_name                || hospital.get('Hospital_Name'),
                Slogan                  : req.body.slogan                       || hospital.get('Slogan'),
                Qualification           : req.body.qualification                || hospital.get('Qualification'),
                Level                   : req.body.level                        || hospital.get('Level'),
                License                 : req.body.license                      || hospital.get('License'),
                Address                 : req.body.address                      || hospital.get('Address'),
                Introduction            : req.body.introduction                 || hospital.get('Introduction'),
                Sort                    : req.body.sort                         || hospital.get('Sort'),
                Release_Time            : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save Hospital Succed!"
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
 * Upload Logo
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadLogo(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.logo_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var filename = randomstring.generate(7);
            var oldpath = files.logo_image.path;
            var newpath = 'C:/Users/royal/hospital/' + filename + "_logo.jpg";

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Logo Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadLogo(req, res) {
    console.log(req.params.id);
    Hospital.forge({id :  req.params.id})
        .fetch()
        .then(function(hospital) {
            var path = hospital.toJSON().Logo.toString();
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
 * Upload Publicity photos
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadPublicity(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.publicity_image1 == null || files.publicity_image2 == null || files.publicity_image3 == null || files.publicity_image4 == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var filename = randomstring.generate(7);
            var oldpath1 = files.publicity_image1.path;
            var newpath1 = 'C:/Users/royal/hospital/' + filename + "_publicity1.jpg";

            filename = randomstring.generate(7);
            var oldpath2 = files.publicity_image2.path;
            var newpath2 = 'C:/Users/royal/hospital/' + filename + "_publicity2.jpg";

            filename = randomstring.generate(7);
            var oldpath3 = files.publicity_image3.path;
            var newpath3 = 'C:/Users/royal/hospital/' + filename + "_publicity3.jpg";

            filename = randomstring.generate(7);
            var oldpath4 = files.publicity_image4.path;
            var newpath4 = 'C:/Users/royal/hospital/' + filename + "_publicity4.jpg";

            if (req.params.id > 0) {
                PublicityPhoto.where('Hospital_Id' , req.params.id)
                                .fetchAll({require : true})
                                .then(function(photos) {
                                    console.log(photos.toJSON());
                                    for (var i = 0; i < 4; i ++) {
                                        fs.unlinkSync(photos.toJSON()[i].Photos);
                                    }
                                });
                PublicityPhoto.where('Hospital_Id', req.params.id)
                                .destroy();
            }
            
            fs.rename(oldpath1, newpath1, function(err) {
                if (err)
                    throw err;
                PublicityPhoto.forge({
                    Hospital_Id : req.params.id,
                    Photos       : newpath1
                }, {hasTimestamps: true}).save()
                .then(function() {
                    fs.rename(oldpath2, newpath2, function(err) {
                        if (err)
                            throw err;
                        PublicityPhoto.forge({
                            Hospital_Id : req.params.id,
                            Photos       : newpath2
                        }, {hasTimestamps: true}).save()
                        .then(function() {
                            fs.rename(oldpath3, newpath3, function(err) {
                                if (err)
                                    throw err;
                                PublicityPhoto.forge({
                                    Hospital_Id : req.params.id,
                                    Photos       : newpath3
                                }, {hasTimestamps: true}).save()
                                .then(function() {
                                    fs.rename(oldpath4, newpath4, function(err) {
                                        if (err)
                                            throw err;
                                        PublicityPhoto.forge({
                                            Hospital_Id : req.params.id,
                                            Photos       : newpath4
                                        }, {hasTimestamps: true}).save()
                                        .then(function() {
                                            res.json({
                                                error   : false,
                                                message : "Publicity Image Uploading Succed!",
                                                id      : req.params.id
                                            })
                                        })
                                    });
                                })
                            });
                        })
                    });
                })
            }); 
        }
    });
}

/**
 * Download Publicity` Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

function SendTo(req, res, path) {
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
}

export function DownloadPublicity(req, res) {
    console.log(req.params);
    PublicityPhoto.where('Hospital_Id', req.params.id)
        .fetchAll({require : true})
        .then(function(publicitys) {

            if (publicitys != null) {
                let paths = {};
                var length = publicitys.toJSON().length;
                for (var i = 0; i < length; i ++) {
                    paths[i] = publicitys.toJSON()[i].Photos.toString();
                }
                SendTo(req, res, paths[req.params.selection]);
            }
        });
}

/**
 *  Get hospital by id
 *
 * @param {object} req
 * @param {object} res

 * @returns {*}
 */
export function GetHospitalById(req, res) {
    Hospital.forge({id: req.params.id})
        .fetch()
        .then(hospital => {
            if (!hospital) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, hospital: {}
                });
            }
            else {
                res.json({
                    error: false,
                    hospital: hospital.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get services by hospital id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetServices(req, res) {
    Hospital.forge({id: req.params.id})
        .fetch({withRelated: ['Services']})
        .then(hospital => {

            hospital.Services().fetch().then(function(services) {
                console.log(services);
                if (!services) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, services: {}
                    });
                }
                else {
                    res.json({
                        error            : false,
                        services         : services.toJSON()
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
 *  Get teams by hospital id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetTeams(req, res) {
    Hospital.forge({id: req.params.id})
        .fetch({withRelated: ['Teams']})
        .then(hospital => {

            hospital.Teams().fetch().then(function(teams) {
                console.log(teams);
                if (!teams) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, teams: {}
                    });
                }
                else {
                    res.json({
                        error            : false,
                        teams            : teams.toJSON()
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
 *  Get cases by hospital id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetCases(req, res) {
    Hospital.forge({id: req.params.id})
        .fetch({withRelated: ['Cases']})
        .then(hospital => {

            hospital.Cases().fetch().then(function(cases) {
                console.log(cases);
                if (!cases) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, cases: {}
                    });
                }
                else {
                    res.json({
                        error            : false,
                        cases            : cases.toJSON()
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
 *  Change Hospital Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Hospital.forge({id: req.params.id})
        .fetch({require: true})
        .then(hospital => hospital.save({
                Status : !hospital.get('Status')
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
 * Get Hospitals
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetHospitals(req, res) {
    Hospital.forge()
        .fetchAll({withRelated: ['Services', 'Teams', 'Cases']})
        .then(hospital => res.json({
                error: false,
                hospitals: hospital.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete hospital by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteHospital(req, res) {
    Hospital.forge({id: req.params.id})
        .fetch({require: true})
        .then(hospital => {
            Service.forge({Hospital_Id : req.params.id})
                    .fetch()
                    .then(services => {
                        if (services != null)
                            Service.where('Hospital_Id', req.params.id)
                                            .destroy();
                    });
            Team.forge({Hospital_Id : req.params.id})
                    .fetch()
                    .then(teams => {
                        if (teams != null)
                            Team.where('Hospital_Id', req.params.id)
                                            .destroy();
                    });
            Case.forge({Hospital_Id : req.params.id})
                    .fetch()
                    .then(cases => {
                        if (cases != null)
                            Case.where('Hospital_Id', req.params.id)
                                            .destroy();
                    });
            PublicityPhoto.forge({Hospital_Id : req.params.id})
                    .fetch()
                    .then(publicitys => {
                        if (publicitys != null)
                            PublicityPhoto.where('Hospital_Id', req.params.id)
                                            .destroy();
                    });
            hospital.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete hospital Succed.'
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: err.message
                })
            )
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Get Hospital Count
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Count(req, res) {
    Hospital.count()
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
 * Search Hospital
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function Search(req, res) {
    var search = "%" + req.params.text + "%";
    let hospitals = await Hospital.query()
                .where("Hospital_Name", "LIKE", search)
                .orWhere("Slogan", "LIKE", search)
                .orWhere("Introduction", "LIKE", search);
    res.json({
        searched  : true,
        hospitals : hospitals
    });
}
