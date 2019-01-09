import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import CoreTeam         from '../models/core_team.model';
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
        CoreTeam.forge({
            Member_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(member => res.json({
                    error   : false,
                    message : "Image Uploading Succed!",
                    id      : member.id
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
    CoreTeam.forge({id: id})
    .fetch({require: true})
    .then(function(member) {
        if (member.get('Member_Img') != "")
            fs.unlinkSync(member.get('Member_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Canner.forge({id: id})
                .fetch()
                .then(member => member.save({
                        Member_Img : newpath
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
 * Store new member
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveMember(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    CoreTeam.forge({id: req.body.id})
        .fetch({require: true})
        .then(member => member.save({
                Member_Name     : req.body.member_name      || member.get('Member_Name'),
                Position        : req.body.position         || member.get('Position'),
                Profile         : req.body.profile          || member.get('Profile'),
                Sort            : req.body.sort             || member.get('Sort'),
                Release_Time    : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Save Member Succed"
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
 * Upload Member Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadMemberImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.member_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.member_image.path;
            var newpath = 'C:/Users/royal/' + files.member_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Member Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadBannerImage(req, res) {
    CoreTeam.forge({id :  req.params.id})
        .fetch()
        .then(function(member) {
            var path = member.toJSON().Member_Img.toString();
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
 *  Find member by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetMemberById(req, res) {
    CoreTeam.forge({id: req.params.id})
        .fetch()
        .then(member => {
            if (!member) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Member: {}
                });
            }
            else {
                res.json({
                    error: false,
                    member: member.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Member Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    CoreTeam.forge({id: req.params.id})
        .fetch({require: true})
        .then(member => member.save({
                Status : !member.get('Status')
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
 * Get All Members
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetMembers(req, res) {
    CoreTeam.forge()
        .fetchAll()
        .then(member => res.json({
                error: false,
                members: member.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete member by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteMember(req, res) {
    CoreTeam.forge({id: req.params.id})
        .fetch({require: true})
        .then(member => member.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete Member Succed.'
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

    CoreTeam.forge({id: req.params.id})
        .fetch({require: true})
        .then(member => fs.unlinkSync(member.get('Member_Img')));
}

