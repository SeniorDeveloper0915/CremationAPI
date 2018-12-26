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
                    success : true,
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
                Member_Name     : req.body.member_name      || member.get('Banner_Title'),
                Position        : req.body.position         || member.get('URL'),
                Profile         : req.body.profile          || member.get('Profile'),
                Sort            : req.body.sort             || member.get('Sort'),
                Release_Time    : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "New Member Succed"
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
        if (files.banner_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.banner_image.path;
            var newpath = 'C:/Users/royal/' + files.banner_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
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
                    Member: member.toJSON()
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
                banners: member.toJSON()
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
                    data: {message: 'Delete Member Succed.'}
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

    CoreTeam.forge({id: req.params.id})
        .fetch({require: true})
        .then(member => fs.unlinkSync(member.get('Banner_Img')));
}

