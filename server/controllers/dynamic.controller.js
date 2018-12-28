import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Dynamic           from '../models/dynamic.model';
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
        Dynamic.forge({
            Dynamic_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(dynamic => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : dynamic.id
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
    Dynamic.forge({id: id})
    .fetch({require: true})
    .then(function(dynamic) {
        if (dynamic.get('Dynamic_Img') != "")
            fs.unlinkSync(dynamic.get('Dynamic_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Dynamic.forge({id: id})
                .fetch()
                .then(dynamic => dynamic.save({
                        Dynamic_Img : newpath
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
 * Store new dynamic
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveDynamic(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Dynamic.forge({id: req.body.id})
        .fetch({require: true})
        .then(dynamic => dynamic.save({
                Banner_Title: req.body.banner_title || dynamic.get('Banner_Title'),
                URL         : req.body.url          || dynamic.get('URL'),
                Sort        : req.body.sort         || dynamic.get('Sort'),
                Release_Time: Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "New Dynamic Succed"
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
 * Upload Dynamic Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadDynamicImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.dynamic_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.dynamic_image.path;
            var newpath = 'C:/Users/royal/' + files.dynamic_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}


/**
 *  Find dynamic by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDynamicById(req, res) {
    Dynamic.forge({id: req.params.id})
        .fetch()
        .then(banner => {
            if (!banner) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Dynamic: {}
                });
            }
            else {
                res.json({
                    error: false,
                    Dynamic: dynamic.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Dynamic Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Dynamic.forge({id: req.params.id})
        .fetch({require: true})
        .then(dynamic => dynamic.save({
                Status : !dynamic.get('Status')
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
 * Get All Dynamics
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDynamics(req, res) {
    Dynamic.forge()
        .fetchAll()
        .then(dynamic => res.json({
                error: false,
                banners: dynamic.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete dynamic by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteBanner(req, res) {
    Dynamic.forge({id: req.params.id})
        .fetch({require: true})
        .then(dynamic => dynamic.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Dynamic Succed.'}
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

    Dynamic.forge({id: req.params.id})
        .fetch({require: true})
        .then(dynamic => fs.unlinkSync(dynamic.get('Dynamic_Img')));
}

