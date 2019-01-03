import express                          from 'express';
import * as helpcenterCtrl              from '../controllers/helpcenter.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: help center
 *     description: Help Center operations
 */


router.route('/modify')
    
    /**
     * @swagger
     * /helpcenter/modify:
     *   put:
     *     tags:
     *       - help center
     *     summary: "Modify Help Center By Id"
     *     security:
     *       - Bearer: []
     *     operationId: modify
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Updated Help Center object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/HelpCenter"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/HelpCenter"
     *       400:
     *         description: Invalid HelpCenter
     */

    .put(validate(schema.HelpCenter), (req, res) => {
        helpcenterCtrl.ModifyHelpCenter(req, res);
    });


router.route('/get')

    /**
     * @swagger
     * /helpcenter/get:
     *   get:
     *     tags:
     *       - help center
     *     summary: Get Help Center
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of help center that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/HelpCenter"
     *       404:
     *          description: HelpCenter not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        helpcenterCtrl.GetHelpCenterById(req, res);
    });

export default router;