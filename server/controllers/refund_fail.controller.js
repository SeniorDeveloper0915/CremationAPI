import bcrypt                   from 'bcrypt';
import HttpStatus               from 'http-status-codes';
import RefundFail               from '../models/refund_fail.model';
import formidable               from 'formidable';
import fs                       from 'fs';
import date                     from 'date-and-time';

/**
 * Add New Refund Fail
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function AddFailRefund(req, res) {

    RefundFail.forge({
        OrderId         : require.body.order_id,
        UserID          : req.body.user_id,
        PhoneNumber     : req.body.phonenumber,
        Order_Date      : req.body.order_date,
        Refund_Date     : req.body.refund_date,
        Refund_Reason   : req.body.refund_reason,
        Fail_Reason     : req.body.fail_reason
    }, {hasTimestamps: true}).save()
        .then(order => res.json({
                error   : false,
                message : "Add Fail Refund Succed!"
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );

}

/**
 *  Get fail refund order by userId
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetFailRefund(req, res) {
    RefundFail.forge({UserID: req.body.userId})
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
 * Get Fail Refund Orders
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 
export function GetFailRefunds(req, res) {
    RefundFail.forge()
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