import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Industry         from '../models/industry.model';
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
        Industry.forge({
            Industry_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(industry => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : industry.id
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
    Industry.forge({id: id})
    .fetch({require: true})
    .then(function(industry) {
        if (industry.get('Industry_Img') != "")
            fs.unlinkSync(industry.get('Industry_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Industry.forge({id: id})
                .fetch()
                .then(industry => industry.save({
                        Industry_Img : newpath
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
 * Store new industry
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveDynamic(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Industry.forge({id: req.body.id})
        .fetch({require: true})
        .then(industry => industry.save({
                Banner_Title: req.body.banner_title || industry.get('Banner_Title'),
                URL         : req.body.url          || industry.get('URL'),
                Sort        : req.body.sort         || industry.get('Sort'),
                Release_Time: Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "New industry Succed"
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
 * Upload Industry Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadIndustryImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.industry_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.industry_image.path;
            var newpath = 'C:/Users/royal/' + files.industry_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}


/**
 *  Find industry by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetIndustryById(req, res) {
    Industry.forge({id: req.params.id})
        .fetch()
        .then(industry => {
            if (!industry) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Industry: {}
                });
            }
            else {
                res.json({
                    error: false,
                    Industry: industry.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Industry Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Industry.forge({id: req.params.id})
        .fetch({require: true})
        .then(industry => industry.save({
                Status : !industry.get('Status')
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
 * Get All Industries
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetIndustries(req, res) {
    Industry.forge()
        .fetchAll()
        .then(industry => res.json({
                error: false,
                banners: industry.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete industry by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteBanner(req, res) {
    Industry.forge({id: req.params.id})
        .fetch({require: true})
        .then(industry => industry.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Industry Succed.'}
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

    Industry.forge({id: req.params.id})
        .fetch({require: true})
        .then(industry => fs.unlinkSync(industry.get('Industry_Img')));
}

