import HttpStatus       from 'http-status-codes';
import Raider           from '../models/raider.model';
import RaiderCategory   from '../models/raider_category.model';
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
        Raider.forge({
            Raider_Img : newpath
        }, {hasTimestamps: true}).save()
            .then(raider => res.json({
                    error   : false,
                    message : "Image Uploading Succed!",
                    id      : raider.id
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
    Raider.forge({id: id})
    .fetch({require: true})
    .then(function(raider) {
        if (raider.get('Raider_Img') != "")
            fs.unlinkSync(raider.get('Raider_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Raider.forge({id: id})
                .fetch()
                .then(raider => raider.save({
                        Raider_Img : newpath
                    })
                    .then(() => res.json({
                            error   : false,
                            message : "Image Uploading Succed!",
                            id      : id
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
        });
    });
}

/**
 *  Save New Raider
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function SaveRaider(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Raider.forge({id: req.body.id})
        .fetch({require: true})
        .then(raider => raider.save({
                Category_Id         : req.body.category_id              || raider.get('Category_Id'),
                Raider_Title        : req.body.raider_title             || raider.get('Raider_Title'),
                Raider_Sec_Title    : req.body.raider_sec_title         || raider.get('Raider_Sec_Title'),
                Content             : req.body.content                  || raider.get('Content'),
                Sort                : req.body.sort                     || raider.get('Sort'),
                Release_Time        : Release_Time
            })
                .then(function() {
                    RaiderCategory.forge({id : require.body.category_id})
                            .fetch()
                            .then(function(category) {
                                category.save({Article_Cnt : category.get('Article_Cnt') + 1})
                                    .then(res => res.json({
                                                    error   : false,
                                                    message : "Save Raider Succed!"
                                                }))
                            })
                })
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
 * Upload Raider Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadRaiderImage(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.raider_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath = files.raider_image.path;
            var newpath = 'C:/Users/royal/' + files.raider_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Download Raider Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function DownloadRaiderImage(req, res) {
    Raider.forge({id :  req.params.id})
        .fetch()
        .then(function(raider) {
            var path = raider.toJSON().Raider_Img.toString();
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
 *  Get raider by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetRaiderById(req, res) {
    Raider.forge({id: req.params.id})
        .fetch()
        .then(raider => {
            if (!raider) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, raider: {}
                });
            }
            else {
                res.json({
                    error: false,
                    raider: raider.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Change Raider Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Raider.forge({id: req.params.id})
        .fetch({require: true})
        .then(raider => raider.save({
                Status : !raider.get('Status')
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
 *  Increase Raider Volume
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Increase(req, res) {

    Raider.forge({id: req.params.id})
        .fetch({require: true})
        .then(raider => raider.save({
                Reading_Volume : raider.get('Reading_Volume') + 1
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
 * Get All Raiders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetRaiders(req, res) {
    Raider.query(function(qb){
            qb.orderBy('Sort', 'DESC'); 
        }).fetchAll()
        .then(raider => res.json({
                error: false,
                raiders: raider.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get Featured Raiders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetFeatured(req, res) {
    Raider.query(function(qb){
        qb.orderBy('Sort', 'DESC');
        qb.limit(10);
    }).fetchAll({

    }).then(function(raider){
        // process results
        res.json( {
            error :  false,
            raider :  raider.toJSON()
        })
    });
}

/**
 *  Get Load More
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function LoadMore(req, res) {
    Raider.query(function(qb){
        qb.limit(req.body.cnt);
        qb.offset(req.body.start * req.body.cnt);
        qb.orderBy('Sort', 'DESC');
    }).fetchAll({

    }).then(function(raider){
        // process results
        res.json( {
            error :  false,
            raider :  raider.toJSON()
        })
    });
}

/**
 * Delete Raider by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteRaider(req, res) {
    Raider.forge({id: req.params.id})
        .fetch({require: true})
        .then(raider => raider.destroy()
            .then(() => res.json({
                    error: false,
                    message: 'Delete Raider Succed.'
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
 * Search Raiders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export async function Search(req, res) {
    var search = "%" + req.body.text + "%";
    Raider.query(function(qb) {
        qb.where('Raider_Title', 'LIKE', search);
        qb.orWhere('Raider_Sec_Title', 'LIKE', search);
        qb.orWhere('Content', 'LIKE', search);
        qb.limit(req.body.cnt);
        qb.offset(req.body.start * req.body.cnt);
    }).fetchAll().then(questions => {
        res.json({
            error : false,
            questions : questions.toJSON()
        })
    });
}