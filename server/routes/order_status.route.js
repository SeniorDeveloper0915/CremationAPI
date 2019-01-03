import express                          from 'express';
import * as orderStatusCtrl             from '../controllers/order_status.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: order status
 *     description: Order Status operations
 */



router.route('/get_by_id/:id')

    /**
     * @swagger
     * /status/get_by_id/{id}:
     *   get:
     *     tags:
     *       - order status
     *     summary: Get Order Status by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order status that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/OrderStatus"
     *       404:
     *          description: OrderStatus not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        orderStatusCtrl.GetStatusById(req, res);
    });

router.route('/get/orders/:id')

    /**
     * @swagger
     * /status/get/orders/{id}:
     *   get:
     *     tags:
     *       - order status
     *     summary: Get Orders by Id
     *     operationId: getOrdersById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order status that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/OrderStatus"
     *       404:
     *          description: OrderStatus not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        orderStatusCtrl.GetOrders(req, res);
    });

router.route('/get')
    /**
     * @swagger
     * /status/get:
     *   get:
     *     tags:
     *       - order status
     *     summary: "List all order status"
     *     operationId: get
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters: []
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *            type: object
     */
    .get((req, res) => {
        orderStatusCtrl.GetStatus(req, res);
    });


export default router;