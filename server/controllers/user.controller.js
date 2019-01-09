import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import User             from '../models/user.model';
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
        User.forge({
            Avatar : newpath
        }, {hasTimestamps: true}).save()
            .then(user => res.json({
                    error   : false,
                    message : "Image Uploading Succed!",
                    id      : user.id
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
    User.forge({id: id})
    .fetch({require: true})
    .then(function(user) {
        if (user.get('Avatar') != "")
            fs.unlinkSync(user.get('Avatar'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            User.forge({id: id})
                .fetch()
                .then(user => user.save({
                        Avatar : newpath
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
 * Store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);

    User.forge({id: req.body.id})
        .fetch({require: true})
        .then(user => user.save({
                UserID      : req.body.userid       || user.get('UserID'),
                Account     : req.body.account      || user.get('Account'),
                NickName    : req.body.nickname     || user.get('NickName'),
                Email       : req.body.email        || user.get('Email'),
                Password    : password              || user.get('Password'),
                Gender      : req.body.gender       || user.get('gender'),
                Birthday    : req.body.birthday     || user.get('birthday'),
                Area        : req.body.area         || user.get('Area')
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save User Succed"
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
 * Upload Avatar Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadAvatarImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.avatar_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.avatar_image.path;
            var newpath = 'C:/Users/royal/' + files.avatar_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Avatar Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadBannerImage(req, res) {
    User.forge({id :  req.params.id})
        .fetch()
        .then(function(user) {
            var path = user.toJSON().Avatar.toString();
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
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetUserById(req, res) {
    User.forge({id: req.params.id})
        .fetch()
        .then(user => {
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, User: {}
                });
            }
            else {
                res.json({
                    error: false,
                    User: user.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Get All User
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetUsers(req, res) {
    User.forge()
        .fetchAll()
        .then(user => res.json({
                error: false,
                users: user.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteUser(req, res) {
    User.forge({id: req.params.id})
        .fetch({require: true})
        .then(user => user.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete User Succed.'
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

    User.forge({id: req.params.id})
        .fetch({require: true})
        .then(user => fs.unlinkSync(user.get('Avatar')));
}

