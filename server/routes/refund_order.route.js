import express                          from 'express';
import * as refundOrderCtrl             from '../controllers/refund_order.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: refund order
 *     description: Refund Order operations
 */


router.route('/add')

    /**
     * @swagger
     * /refund/request/add:
     *   put:
     *     tags:
     *       - refund order
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
     *         description: Created Refund Order object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/refund order"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/RefundOrder"
     *       403:
     *          description: RefundOrder not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.RefundOrder), (req, res) => {
        refundOrderCtrl.AddRefundOrder(req, res);
    });

router.route('/get_by_userid')

    /**
      * @swagger
      * /refund/request/get/{userId}:
      *   get:
      *     tags:
      *       - refund order
      *     summary: Get refund orer  by UserId
      *     operationId: getByUserId
      *     consumes:
      *       - application/json
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: id
      *         in: path
      *         description: id of UserId that needs to be fetched
      *         required: true
      *         type: integer
      *     responses:
      *       200:
      *         description: OK
      *         schema:
      *           $ref: "#/definitions/RefundOrder"
      *       404:
      *          description: RefundOrder not found
      *          schema:
      *             $ref: '#/definitions/Error'
      */ 

    .get(validate(schema.CheckUserID), (req, res) => {
        refundOrderCtrl.GetRefundOrderByUserId(req, res);
    });



router.route('/delete/:id')
    /**
     * @swagger
     * /refund/request/delete/{id}:
     *   delete:
     *     tags:
     *       - refund order
     *     summary: Delete the refund order by Id
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
        refundOrderCtrl.DeleteRefundOrder(req, res);
    });

router.route('/get')
    /**
     * @swagger
     * /refund/fail/get:
     *   get:
     *     tags:
     *       - order
     *     summary: "List all fail refund orders"
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
        refundOrderCtrl.GetRefundOrders(req, res);
    });

export default router;