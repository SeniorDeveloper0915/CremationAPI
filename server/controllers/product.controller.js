import bcrypt           from 'bcrypt';
import HttpStatus       from 'http-status-codes';
import Product          from '../models/product.model';
import PromotionImage   from '../models/promotion_image.model';
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
        Product.forge({
            Logo : newpath
        }, {hasTimestamps: true}).save()
            .then(product => res.json({
                    success : true,
                    message : "Image Uploading Succed!",
                    id      : product.id
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
    Product.forge({id: id})
    .fetch({require: true})
    .then(function(product) {
        if (product.get('Cover_Img') != "")
            fs.unlinkSync(product.get('Cover_Img'));
        fs.rename(oldpath, newpath, function(err) {
            if (err)
                throw err;
            Product.forge({id: id})
                .fetch()
                .then(product => product.save({
                        Cover_Img : newpath
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
 *  Change New Product
 *
 * @param {object} req
 * @param {object} res
 * @param {string} sel
 * @returns {*}
 */

export function SaveProduct(req, res) {
    let Release_Time = new Date();
    date.format(Release_Time, 'YYYY-MM-DD HH:mm:ss');

    Product.forge({id: req.body.id})
        .fetch({require: true})
        .then(product => product.save({
                Product_Title           : req.body.product_title                || product.get('Product_Title'),
                Origin_Price            : req.body.origin_price                 || product.get('Origin_Price'),
                Start_Price             : req.body.start_price                  || product.get('Start_Price'),
                Booking                 : req.body.booking                      || product.get('Booking'),
                First_Project_Id        : req.body.first_project_id             || product.get('First_Project_Id'),
                Second_Project_Id       : req.body.second_project_id            || product.get('Second_Project_Id'),
                Third_Project_Id        : req.body.third_project_id             || product.get('Third_Project_Id'),
                Price_Description       : req.body.price_description            || product.get('Price_Description'),
                Details                 : req.body.Details                      || product.get('Details'),
                Release_Time            : Release_Time
            })
                .then(() => res.json({
                        error   : false,
                        message : "Succed"
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
 * Upload Cover Image
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadCover(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.cover_image == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath1 = files.cover_image.path;
            var newpath1 = 'C:/Users/royal/' + files.cover_image.name;

            if (req.params.id == 0) {
                UploadImage(req, res, oldpath, newpath);
            } else {
                ChangeImage(req, res, oldpath, newpath, req.params.id);
            }
        }
    });
}

/**
 * Upload Promotion Images
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function UploadPromotion(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (files.promotion_image1 == null || files.promotion_image2 == null || files.promotion_image3 == null || files.promotion_image4 == null || files.promotion_image5 == null || files.promotion_image6 == null) {
            res.send({
                error : true,
                message : "Select File Correctly!"
            });
        } else {
            var oldpath1 = files.promotion_image1.path;
            var newpath1 = 'C:/Users/royal/' + files.publicity_image1.name;

            var oldpath2 = files.promotion_image2.path;
            var newpath2 = 'C:/Users/royal/' + files.publicity_image2.name;

            var oldpath3 = files.promotion_image3.path;
            var newpath3 = 'C:/Users/royal/' + files.publicity_image3.name;

            var oldpath4 = files.promotion_image4.path;
            var newpath4 = 'C:/Users/royal/' + files.publicity_image4.name;

            var oldpath5 = files.promotion_image5.path;
            var newpath5 = 'C:/Users/royal/' + files.publicity_image4.name;

            var oldpath6 = files.promotion_image6.path;
            var newpath6 = 'C:/Users/royal/' + files.publicity_image4.name;
            if (req.params.id > 0) {
                PromotionImage.where('Product_Id' , req.params.id)
                                .fetchAll({require : true})
                                .then(function(images) {
                                    for (var i = 0; i < 4; i ++) {
                                        fs.unlinkSync(images.toJSON()[i].Images);
                                    }
                                });
                PromotionImage.where('Product_Id', req.params.id)
                                .destroy();
            }
            
            fs.rename(oldpath1, newpath1, function(err) {
                if (err)
                    throw err;
                PromotionImage.forge({
                    Product_Id      : req.params.id,
                    Images          : newpath1
                }, {hasTimestamps: true}).save()
                .then(function() {
                    fs.rename(oldpath2, newpath2, function(err) {
                        if (err)
                            throw err;
                        PromotionImage.forge({
                            Product_Id      : req.params.id,
                            Images          : newpath2
                        }, {hasTimestamps: true}).save()
                        .then(function() {
                            fs.rename(oldpath3, newpath3, function(err) {
                                if (err)
                                    throw err;
                                PromotionImage.forge({
                                    Product_Id      : req.params.id,
                                    Images          : newpath3
                                }, {hasTimestamps: true}).save()
                                .then(function() {
                                    fs.rename(oldpath4, newpath4, function(err) {
                                        if (err)
                                            throw err;
                                        PromotionImage.forge({
                                            Product_Id      : req.params.id,
                                            Images          : newpath4
                                        }, {hasTimestamps: true}).save()
                                        .then(function() {
                                            fs.rename(oldpath5, newpath5, function(err) {
                                                if (err)
                                                    throw err;
                                                PromotionImage.forge({
                                                    Product_Id      : req.params.id,
                                                    Images          : newpath5
                                                }, {hasTimestamps: true}).save()
                                                .then(function() {
                                                    fs.rename(oldpath6, newpath6, function(err) {
                                                        if (err)
                                                            throw err;
                                                        PromotionImage.forge({
                                                            Product_Id      : req.params.id,
                                                            Images          : newpath6
                                                        }, {hasTimestamps: true}).save()
                                                        .then(function() {
                                                            res.json({
                                                                success : true
                                                            })
                                                        })
                                                    });
                                                })
                                            });
                                        })
                                    });
                                })
                            });
                        })
                    });
                })
            }); 
        }
    });
}

/**
 *  Get Product by id
 *
 * @param {object} req
 * @param {object} res

 * @returns {*}
 */
export function GetProductById(req, res) {
    Product.forge({id: req.params.id})
        .fetch()
        .then(product => {
            if (!product) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, product: {}
                });
            }
            else {
                res.json({
                    error: false,
                    product: product.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Change Product Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function ChangeStatus(req, res) {

    Product.forge({id: req.params.id})
        .fetch({require: product})
        .then(product => product.save({
                Status : !product.get('Status')
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
 * Get Products
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetProducts(req, res) {
    Product.forge()
        .fetchAll()
        .then(product => res.json({
                error: false,
                products: product.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete product by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteProduct(req, res) {
    Product.forge({id: req.params.id})
        .fetch({require: true})
        .then(product => product.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Delete product Succed.'}
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
