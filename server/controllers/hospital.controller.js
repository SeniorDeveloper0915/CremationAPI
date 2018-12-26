import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Hospital         from '../models/hospital.model';
import PublicityPhoto   from '../models/publicity_photo.model';
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
        Hospital.forge({
            Logo : newpath
        }, {hasTimestamps: true}).save()
            .then(hospital => res.json({
                    success : true,
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
            var oldpath1 = files.logo_image.path;
            var newpath1 = 'C:/Users/royal/' + files.logo_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
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
            var oldpath1 = files.publicity_image1.path;
            var newpath1 = 'C:/Users/royal/' + files.publicity_image1.name;

            var oldpath2 = files.publicity_image2.path;
            var newpath2 = 'C:/Users/royal/' + files.publicity_image2.name;

            var oldpath3 = files.publicity_image3.path;
            var newpath3 = 'C:/Users/royal/' + files.publicity_image3.name;

            var oldpath4 = files.publicity_image4.path;
            var newpath4 = 'C:/Users/royal/' + files.publicity_image4.name;

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
                                                success : true
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
        .fetchAll()
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
        .then(hospital => hospital.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete hospital Succed.'}
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