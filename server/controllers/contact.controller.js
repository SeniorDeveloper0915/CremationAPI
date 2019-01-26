import HttpStatus               from 'http-status-codes';
import ContactUs                from '../models/contact.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


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
        ContactUs.forge({
            Contact_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(contact => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : contact.id
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
    ContactUs.forge({id: id})
    .fetch({require: true})
    .then(function(contact) {
        if (contact.get('Contact_Img') != "")
            fs.unlinkSync(contact.get('Contact_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Canner.forge({id: id})
                .fetch()
                .then(contact => contact.save({
                        Conact_Img : newpath
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
 *  Get Contact Us by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetContactById(req, res) {
    ContactUs.forge()
        .fetch()
        .then(contact => {
            if (!contact) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, contact: {}
                });
            }
            else {
                res.json({
                    error: false,
                    contact: contact.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Modify Contact Us
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ModifyContact(req, res) {

    ContactUs.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(contact) {
                if (contact != null)
                    contact.save({
                        Information       : req.body.information        || contact.get('Information')
                    })
                    .then(() => res.json({
                            error   : false,
                            message : "Modify Contact Succed"
                        })
                    )
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: true,
                            data: {message: err.message}
                        })
                    )
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Upload Contact Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadContactImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.contact_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.contact_image.path;
            var newpath = 'C:/Users/royal/contact/' + files.contact_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Contact Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadCaseImage(req, res) {
    ContactUs.forge({id :  req.params.id})
        .fetch()
        .then(function(contact) {
            var path = contact.toJSON().Contact_Img.toString();
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