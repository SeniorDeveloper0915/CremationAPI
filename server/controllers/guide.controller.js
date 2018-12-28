import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Guide            from '../models/guide.model';
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
        Guide.forge({
            Guide_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(guide => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : guide.id
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
    Guide.forge({id: id})
    .fetch({require: true})
    .then(function(guide) {
        if (guide.get('Guide_Img') != "")
            fs.unlinkSync(guide.get('Guide_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Guide.forge({id: id})
                .fetch()
                .then(guide => guide.save({
                        Guide_Img : newpath
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
 * Store new guide
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveGuide(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Guide.forge({id: req.body.id})
        .fetch({require: true})
        .then(guide => guide.save({
                BootPage_Title  : req.body.page_title       || guide.get('BootPage_Title'),
                URL             : req.body.url              || guide.get('URL'),
                Release_Time    : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "New Guide Succed"
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
 * Upload Guide Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadGuideImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.guide_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.guide_image.path;
            var newpath = 'C:/Users/royal/' + files.guide_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}


/**
 *  Find guide by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetGuideById(req, res) {
    Guide.forge({id: req.params.id})
        .fetch()
        .then(guide => {
            if (!guide) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Guide: {}
                });
            }
            else {
                res.json({
                    error: false,
                    Guide: guide.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Guide Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Guide.forge({id: req.params.id})
        .fetch({require: true})
        .then(guide => guide.save({
                Status : !guide.get('Status')
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
 * Get All Guides
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetGuides(req, res) {
    Guide.forge()
        .fetchAll()
        .then(guide => res.json({
                error: false,
                guides: guide.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete guide by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteGuide(req, res) {
    Guide.forge({id: req.params.id})
        .fetch({require: true})
        .then(guide => guide.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Guide Succed.'}
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

    Guide.forge({id: req.params.id})
        .fetch({require: true})
        .then(guide => fs.unlinkSync(guide.get('Guide_Img')));
}

