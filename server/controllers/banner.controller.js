import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Banner           from '../models/banner.model';
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
        Banner.forge({
            Banner_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(banner => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : banner.id
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
    Banner.forge({id: id})
    .fetch({require: true})
    .then(function(banner) {
        if (banner.get('Banner_Img') != "")
            fs.unlinkSync(banner.get('Banner_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Banner.forge({id: id})
                .fetch()
                .then(banner => banner.save({
                        Banner_Img : newpath
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
 * Store new banner
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveBanner(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Banner.forge({id: req.body.id})
        .fetch({require: true})
        .then(banner => banner.save({
                Banner_Title: req.body.banner_title || banner.get('Banner_Title'),
                URL         : req.body.url          || banner.get('URL'),
                Sort        : req.body.sort         || banner.get('Sort'),
                Release_Time: Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "New Banner Succed"
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
 * Upload Banner Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadBannerImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.banner_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            console.log(files.banner_image);
            var oldpath = files.banner_image.path;
            var fileName = randomstring.generate(7);
            var newpath = 'C:/Users/royal/banner/' + fileName + ".jpg";

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Banner Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadBannerImage(req, res) {
    Banner.forge({id :  req.params.id})
        .fetch()
        .then(function(banner) {
            var path = banner.toJSON().Banner_Img.toString();
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
 *  Find banner by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetBannerById(req, res) {
    Banner.forge({id: req.params.id})
        .fetch()
        .then(banner => {
            if (!banner) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Banner: {}
                });
            }
            else {
                res.json({
                    error: false,
                    Banner: banner.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Banner Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Banner.forge({id: req.params.id})
        .fetch({require: true})
        .then(banner => banner.save({
                Status : !banner.get('Status')
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
 * Get All Banners
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetBanners(req, res) {
    Banner.forge()
        .fetchAll()
        .then(banner => res.json({
                error: false,
                banners: banner.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete banner by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteBanner(req, res) {
    Banner.forge({id: req.params.id})
        .fetch({require: true})
        .then(banner => banner.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Banner Succed.'}
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

    Banner.forge({id: req.params.id})
        .fetch({require: true})
        .then(banner => fs.unlinkSync(banner.get('Banner_Img')));
}

