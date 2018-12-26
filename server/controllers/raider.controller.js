import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Raider           from '../models/raider.model';
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
        Raider.forge({
            Raider_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(raider => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : raider.id
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
    Raider.forge({id: id})
    .fetch({require: true})
    .then(function(raider) {
        if (raider.get('Raider_Img') != "")
            fs.unlinkSync(raider.get('Raider_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Raider.forge({id: id})
                .fetch()
                .then(raider => raider.save({
                        Raider_Img : newpath
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
 *  Save New Raider
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveRaider(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Raider.forge({id: req.body.id})
        .fetch({require: true})
        .then(raider => raider.save({
                Category_Id         : req.body.category_id              || raider.get('Category_Id'),
                Raider_Title        : req.body.raider_title             || raider.get('Raider_Title'),
                Raider_Sec_Title    : req.body.raider_sec_title         || raider.get('Raider_Sec_Title'),
                Content             : req.body.content                  || raider.get('Content'),
                Sort                : req.body.sort                     || raider.get('Sort'),
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
 * Upload Raider Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadRaiderImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.raider_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.raider_image.path;
            var newpath = 'C:/Users/royal/' + files.raider_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}


/**
 *  Get raider by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetRaiderById(req, res) {
    Raider.forge({id: req.params.id})
        .fetch()
        .then(raider => {
            if (!raider) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, raider: {}
                });
            }
            else {
                res.json({
                    error: false,
                    raider: raider.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Change Raider Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Raider.forge({id: req.params.id})
        .fetch({require: true})
        .then(raider => raider.save({
                Status : !raider.get('Status')
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
 * Get All Raiders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetRaiders(req, res) {
    Raider.forge()
        .fetchAll()
        .then(raider => res.json({
                error: false,
                raiders: raider.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Raider by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteRaider(req, res) {
    Raider.forge({id: req.params.id})
        .fetch({require: true})
        .then(raider => raider.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Raider Succed.'}
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