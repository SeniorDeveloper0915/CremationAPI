import HttpStatus       from 'http-status-codes';
import OrderStatus      from '../models/order_status.model';
import formidable       from 'formidable';
import fs               from 'fs';
import date             from 'date-and-time';


/**
 *  Get status by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetStatusById(req, res) {
    OrderStatus.forge({id: req.params.id})
        .fetch()
        .then(status => {
            if (!status) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, status: {}
                });
            }
            else {
                res.json({
                    error: false,
                    status: status.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Get orders by order status id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function GetOrders(req, res) {
    OrderStatus.forge({id: req.params.id})
        .fetch({withRelated: ['Orders']})
        .then(status => {

            status.Orders().fetch().then(function(orders) {
                console.log(orders);
                if (!orders) {                                                                                           
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: true, orders: {}
                    });
                }
                else {
                    res.json({
                        error           : false,
                        orders          : orders.toJSON()
                    });
                }
            });
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Get All Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function GetStatus(req, res) {
    OrderStatus.forge()
        .fetchAll()
        .then(statuses => res.json({
                error: false,
                statuses: statuses.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}
