import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Notification     from '../models/notification.model';
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
        Notification.forge({
            Image : newpath
        }, {hasTimestamps: true}).save()
            .then(notification => res.json({
                    error   : true,
                    message : "Image Uploading Succed!",
                    id      : notification.id
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
    Notification.forge({id: id})
    .fetch({require: true})
    .then(function(notification) {
        if (notification.get('Image') != "")
            fs.unlinkSync(notification.get('Image'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Notification.forge({id: id})
                .fetch()
                .then(notification => notification.save({
                        Image : newpath
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
 * Store new notification
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveNotification(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Notification.forge({id: req.body.id})
        .fetch({require: true})
        .then(notification => notification.save({
                Title           : req.body.title        || notification.get('Title'),
                Notice          : req.body.notice       || notification.get('Notice'),
                Release_Time    : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save Notification Succed!"
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
 * Upload Notification Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadNotificationImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            console.log(files.image);
            var oldpath = files.image.path;
            var fileName = randomstring.generate(7);
            var newpath = 'C:/Users/royal/notification/' + fileName + ".jpg";

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download notification Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadNotificationImage(req, res) {
    Notification.forge({id :  req.params.id})
        .fetch()
        .then(function(notification) {
            var path = notification.toJSON().Image.toString();
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
 *  Find notification by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetNotificationById(req, res) {
    Notification.forge({id: req.params.id})
        .fetch()
        .then(notification => {
            if (!notification) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Notification: {}
                });
            }
            else {
                res.json({
                    error: false,
                    notification: notification.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Notification Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Notification.forge({id: req.params.id})
        .fetch({require: true})
        .then(notification => notification.save({
                Status : !notification.get('Status')
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
 * Get All Notifications
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetNotifications(req, res) {
    Notification.forge()
        .fetchAll()
        .then(notification => res.json({
                error: false,
                notifications: notification.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete notification by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteNotification(req, res) {
    Notification.forge({id: req.params.id})
        .fetch({require: true})
        .then(notification => notification.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete Notification Succed.'
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

    Notification.forge({id: req.params.id})
        .fetch({require: true})
        .then(notification => fs.unlinkSync(notification.get('Image')));
}

