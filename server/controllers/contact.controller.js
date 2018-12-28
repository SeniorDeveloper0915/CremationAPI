import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import ContactUs                from '../models/contact.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';


/**
 * Add New Contact Us
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

function AddKoreanMedicine(req, res) {

    ContactUs.forge({
        Information : req.body.information
    }, {hasTimestamps: true}).save()
        .then(contact => res.json({
                success: true
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}

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
 *  Get Contact Us by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetKoreanById(req, res) {
    ContactUs.forge({id: 1})
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

    KoreanMedicine.forge({id: req.body.id})
        .fetch({require: true})
        .then(function(contact) {
                if (contact != null)
                    contact.save({
                        Information       : req.body.information        || korean.get('Information')
                    })
                    .then(() => res.json({
                            error   : false,
                            message : "Modify First Level Project Succed"
                        })
                    )
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: true,
                            data: {message: err.message}
                        })
                    )
                else
                    AddContactUs(req, res);
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
            var newpath = 'C:/Users/royal/' + files.contact_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}