import express                          from 'express';
import * as copyrightCtrl               from '../controllers/copyright.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: copy right
 *     description: Copy Right operations
 */


router.route('/modify')
    
    /**
     * @swagger
     * /copyright/modify:
     *   put:
     *     tags:
     *       - copy right
     *     summary: "Modify Copy Right By Id"
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
     *         description: Updated Copy Right object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/CopyRight"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/CopyRight"
     *       400:
     *         description: Invalid CopyRight
     */

    .put(validate(schema.CopyRight), (req, res) => {
        copyrightCtrl.ModifyCopyRight(req, res);
    });


router.route('/get')

    /**
     * @swagger
     * /copyright/get:
     *   get:
     *     tags:
     *       - copy right
     *     summary: Get Copy Right
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of copy right that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/CopyRight"
     *       404:
     *          description: CopyRight not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        copyrightCtrl.GetCopyRightById(req, res);
    });

export default router;