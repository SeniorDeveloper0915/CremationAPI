import express                          from 'express';
import * as orderCtrl                   from '../controllers/order.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: order
 *     description: Order operations
 */


router.route('/add')

    /**
     * @swagger
     * /order/add:
     *   put:
     *     tags:
     *       - order
     *     summary: "Create a new Order"
     *     security:
     *        - Bearer: []
     *     operationId: add
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created order object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/order"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Order"
     *       403:
     *          description: Order not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.Order), (req, res) => {
        orderCtrl.AddOrder(req, res);
    });

router.route('/pay/:id')
    /**
     * @swagger
     * /order/pay/{id}:
     *   put:
     *     tags:
     *       - order
     *     summary: Pay
     *     operationId: pay
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Order"
     *       404:
     *          description: Order not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        orderCtrl.Pay(req, res);
    });

router.route('/complete/:id')
    /**
     * @swagger
     * /order/complete/{id}:
     *   put:
     *     tags:
     *       - order
     *     summary: Complete
     *     operationId: complete
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Order"
     *       404:
     *          description: Order not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        orderCtrl.Complete(req, res);
    });

router.route('/refund/request/:id')
    /**
     * @swagger
     * /order/refund/request/{id}:
     *   put:
     *     tags:
     *       - order
     *     summary: Pending refund
     *     operationId: refundRequest
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Order"
     *       404:
     *          description: Order not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        orderCtrl.PedningRefund(req, res);
    });

router.route('/refund/success/:id')
    /**
     * @swagger
     * /order/refund/success/{id}:
     *   put:
     *     tags:
     *       - order
     *     summary: Pending refund
     *     operationId: refundSuccess
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Order"
     *       404:
     *          description: Order not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        orderCtrl.RefundSuccess(req, res);
    });

router.route('/get_by_userid')

    /**
     * @swagger
     * /order/get/{userId}:
     *   get:
     *     tags:
     *       - order
     *     summary: Get Orders by userId
     *     operationId: getByUserId
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of user that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Order"
     *       404:
     *          description: Order not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckUserID), (req, res) => {
        orderCtrl.GetOrdersByUserId(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /order/get:
     *   get:
     *     tags:
     *       - order
     *     summary: "List all orders"
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
        orderCtrl.GetOrders(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /order/delete/{id}:
     *   delete:
     *     tags:
     *       - order
     *     summary: Delete the order by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of order that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        orderCtrl.DeleteOrder(req, res);
    });

export default router;