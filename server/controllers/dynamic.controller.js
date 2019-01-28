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
                    error   : false,
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
                Dynamic_Title               : req.body.dynamic_title                || dynamic.get('Dynamic_Title'),
                Dynamic_Subtitle            : req.body.dynamic_subtitle             || dynamic.get('Dynamic_Subtitle'),
                Dynamic_Content             : req.body.dynamic_content              || dynamic.get('Dynamic_Content'),
                Sort                        : req.body.sort                         || dynamic.get('Sort'),
                Release_Time                : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save Dynamic Succed"
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
 * Download Dynamic Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadDynamicImage(req, res) {
    Dynamic.forge({id :  req.params.id})
        .fetch()
        .then(function(dynamic) {
            var path = dynamic.toJSON().Dynamic_Img.toString();
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
 *  Find dynamic by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDynamicById(req, res) {
    Dynamic.forge({id: req.params.id})
        .fetch()
        .then(dynamic => {
            if (!dynamic) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Dynamic: {}
                });
            }
            else {
                res.json({
                    error: false,
                    dynamic: dynamic.toJSON()
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
 *  Increase Dynamic Volume
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Increase(req, res) {

    console.log(req.params.id);
    Dynamic.forge({id: req.params.id})
        .fetch({require: true})
        .then(dynamic => dynamic.save({
                Reading_Volume : dynamic.get('Reading_Volume') + 1
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
 * Get All Dynamics
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetDynamics(req, res) {
    Dynamic.query(function(qb){
            qb.orderBy('Sort', 'DESC'); 
        }).fetchAll()
        .then(dynamic => res.json({
                error: false,
                dynamics: dynamic.toJSON()
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
export function DeleteDynamic(req, res) {
    Dynamic.forge({id: req.params.id})
        .fetch({require: true})
        .then(dynamic => dynamic.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete Dynamic Succed.'
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

    Dynamic.forge({id: req.params.id})
        .fetch({require: true})
        .then(dynamic => fs.unlinkSync(dynamic.get('Dynamic_Img')));
}

