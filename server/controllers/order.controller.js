import HttpStatus               from 'http-status-codes';
import Order                    from '../models/order.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';

/**
 * Add New Order
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddOrder(req, res) {
    let Order_Date = new Date();
    date.format(Order_Date, 'YYYY-MM-DD HH:mm:ss');

    Order.forge({
        UserID          : req.body.user_id,
        PhoneNumber     : req.body.phonenumber,
        NickName        : req.body.nickname,
        Order_Date      : Order_Date,
        Product_Name    : req.body.product_name,
        Order_Amount    : req.body.order_amount,
        Order_Status    : req.body.order_status
    }, {hasTimestamps: true}).save()
        .then(order => res.json({
                error   : false,
                message : "Save New Order Succed!"
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}

/**
 *  Pay Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Pay(req, res) {

    Order.forge({id: req.params.id})
        .fetch({require: true})
        .then(order => order.save({
                Order_Status : 3
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
 *  Use Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function Use(req, res) {

    Order.forge({id: req.params.id})
        .fetch({require: true})
        .then(order => order.save({
                Order_Status : 5
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
 *  Pending refund status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function PendingRefund(req, res) {

    Order.forge({id: req.params.id})
        .fetch({require: true})
        .then(order => order.save({
                Order_Status : 2
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
 *  Refund Success
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function RefundSuccess(req, res) {

    Order.forge({id: req.params.id})
        .fetch({require: true})
        .then(order => order.save({
                Order_Status : 6
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
 *  Get orders by userId
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetOrdersByUserId(req, res) {
    console.log(req.body.userId);
    Order.forge({UserID: req.body.userId})
        .fetch()
        .then(orders => {
            if (!orders) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, orders: {}
                });
            }
            else {
                res.json({
                    error: false,
                    orders: orders.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Get Orders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetOrders(req, res) {
    Order.forge()
        .fetchAll()
        .then(orders => res.json({
                error: false,
                orders: orders.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Delete Order by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteOrder(req, res) {
    Order.forge({id: req.params.id})
        .fetch({require: true})
        .then(function(project) {
                project.destroy()
                    .then(function() {
                        res.json({
                            error   : false,
                            message : "Delete Order Succed!"
                        });
                    })
            }
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
