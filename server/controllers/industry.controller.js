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
                            success : true,
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
                Industry_Title          : req.body.industry_title       || industry.get('Industry_Title'),
                Industry_Subtitle       : req.body.industry_subtitle    || industry.get('Industry_Subtitle'),
                Industry_Content        : req.body.industry_content     || industry.get('Industry_Content'),
                Sort                    : req.body.sort                 || industry.get('Sort'),
                Release_Time            : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save industry Succed"
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
 * Download Industry Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadIndustryImage(req, res) {
    Industry.forge({id :  req.params.id})
        .fetch()
        .then(function(industry) {
            var path = industry.toJSON().Industry_Img.toString();
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
                    industry: industry.toJSON()
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
 *  Increase Industry Volume
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Increase(req, res) {

    Industry.forge({id: req.params.id})
        .fetch({require: true})
        .then(industry => industry.save({
                Reading_Volume : industry.get('Reading_Volume') + 1
            })
                .then(() => res.json({
                        error   : false,
                        message : "Increase Succed"
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
                industry : industry.toJSON()
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
export function DeleteIndustry(req, res) {
    Industry.forge({id: req.params.id})
        .fetch({require: true})
        .then(industry => industry.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete Industry Succed.'
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: err.message
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

