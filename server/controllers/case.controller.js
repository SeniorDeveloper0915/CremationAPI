import HttpStatus       from 'http-status-codes';
import Case             from '../models/case.model';
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
        Case.forge({
            Case_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(project => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : project.id
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: err
                })
            );
    });
}

/**
 *  Change Case Image
 *
 * @param {object} req
 * @param {object} res
 * @param {string} oldpath
 * @param {string} newpath
 * @param {integer} id
 * @returns {*}
 */

function ChangeImage(req, res, oldpath, newpath, id) {
    Case.forge({id: id})
    .fetch({require: true})
    .then(function(cas) {
        if (cas.get('Case_Img') != "")
            fs.unlinkSync(cas.get('Case_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Case.forge({id: id})
                .fetch()
                .then(cas => cas.save({
                        Case_Img : newpath
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
 * Store new case
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveCase(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Case.forge({id: req.body.id})
        .fetch({require: true})
        .then(cas => cas.save({
                Hospital_Id     : req.body.hospital_Id  || cas.get('Hospital_Id'),
                Title           : req.body.title        || cas.get('Title'),
                Time            : req.body.time         || cas.get('Time'),
                Doctor_Id       : req.body.doctor_id    || cas.get('Doctor_Id'),
                Introduction    : req.body.introduction || cas.get('Introduction'),
                Sort            : req.body.sort         || cas.get('Sort'),
                Release_Time    : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "New Case Succed"
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
 * Upload Case Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadCaseImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.case_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.case_image.path;
            var newpath = 'C:/Users/royal/case/' + files.case_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Case Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadCaseImage(req, res) {
    Case.forge({id :  req.params.id})
        .fetch()
        .then(function(caseimage) {
            var path = caseimage.toJSON().Case_Img.toString();
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
 *  Find case by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetCaseById(req, res) {
    Case.forge({id: req.params.id})
        .fetch()
        .then(cas => {
            if (!cas) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, Case: {}
                });
            }
            else {
                res.json({
                    error: false,
                    case: cas.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 *  Change Case Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Case.forge({id: req.params.id})
        .fetch({require: true})
        .then(cas => cas.save({
                Status : !cas.get('Status')
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
 * Get All Cases
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetCases(req, res) {
    Case.query(function(qb){
            qb.orderBy('Sort', 'ASC'); 
        }).fetchAll()
        .then(cas => res.json({
                error: false,
                cases: cas.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete case by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteCase(req, res) {
    Case.forge({id: req.params.id})
        .fetch({require: true})
        .then(cas => cas.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete Case Succed.'}
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

    Case.forge({id: req.params.id})
        .fetch({require: true})
        .then(cas => fs.unlinkSync(cas.get('Case_Img')));
}

