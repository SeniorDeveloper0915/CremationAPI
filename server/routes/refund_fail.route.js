import express                          from 'express';
import * as refundFailCtrl              from '../controllers/refund_fail.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: refund fail
 *     description: Refund Order operations
 */


router.route('/add')

    /**
     * @swagger
     * /refund/fail/add:
     *   put:
     *     tags:
     *       - refund fail
     *     summary: "Create a new Fail Refund Order"
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
     *         description: Created Fail Refund Order object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/refund fail"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/RefundFail"
     *       403:
     *          description: RefundFail not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.RefundFail), (req, res) => {
        refundFailCtrl.AddFailRefund(req, res);
    });

router.route('/get_by_userid')

    /**
      * @swagger
      * /refund/fail/get/{userId}:
      *   get:
      *     tags:
      *       - refund fila
      *     summary: Get fail refund orer  by UserId
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
      *           $ref: "#/definitions/RefundFail"
      *       404:
      *          description: RefundFail not found
      *          schema:
      *             $ref: '#/definitions/Error'
      */

    .get(validate(schema.CheckUserID), (req, res) => {
        refundFailCtrl.GetFailRefund(req, res);
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
        refundFailCtrl.GetFailRefunds(req, res);
    });

export default router;