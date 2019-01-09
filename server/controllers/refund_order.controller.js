import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import RefundOrder              from '../models/refund_order.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';

/**
 * Add New Refund Order
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddRefundOrder(req, res) {
    let Refund_Date = new Date();
    date.format(Refund, 'YYYY-MM-DD HH:mm:ss');

    RefundOrder.forge({
        OrderId         : require.body.order_id,
        Order_Status    : 2,
        UserID          : req.body.user_id,
        PhoneNumber     : req.body.phonenumber,
        Order_Date      : req.body.order_date,
        Refund_Date     : Refund_Date,
        Refund_Reason   : req.body.refund_reason
    }, {hasTimestamps: true}).save()
        .then(order => res.json({
                error   : false,
                message : "Save Refund Order Succed!"
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}

/**
 *  Get refund order by userId
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetRefundOrderByUserId(req, res) {
    console.log(req.body.userId);
    RefundOrder.forge({UserID: req.body.userId})
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
 * Delete refund order by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function DeleteRefundOrder(req, res) {
    RefundOrder.forge({id: req.params.id})
        .fetch({require: true})
        .then(function(order) {
            order.destroy()
                .then(function() {
                    res.json({
                        error   : false,
                        message : "Delete Refund Order Succed!"
                    });
                })
            }
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Get Refund Orders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 
export function GetRefundOrders(req, res) {
    RefundOrder.forge()
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