import express              from 'express';
import * as dynamicCtrl     from '../controllers/dynamic.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: dynamic
 *     description: Dynamic operations
 */


router.route('/add')

    /**
     * @swagger
     * /dynamic/add:
     *   put:
     *     tags:
     *       - dynamic
     *     summary: "Create a new Dynamic"
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
     *         description: Created dynamic object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/dynamic"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Dynamic"
     *       403:
     *          description: Dynamic not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Dynamic), (req, res) => {
        dynamicCtrl.SaveDynamic(req, res);
    });


router.route('/upload_image')
    .post(validate(schema.CheckId), (req, res) => {
        dynamicCtrl.UploadDynamicImage(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /dynamic/get_by_id/{id}:
     *   get:
     *     tags:
     *       - dynamic
     *     summary: Get the dynamic by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of dynamic that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Dynamic"
     *       404:
     *          description: Dynamic not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        dynamicCtrl.GetDynamicById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /dynamic/modify:
     *   put:
     *     tags:
     *       - dynamic
     *     summary: Modify Dynamic By Id
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
     *         description: Updated dynamic object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Dynamic"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Dynamic"
     *       400:
     *         description: Invalid Dynamic
     */

    .put(validate(schema.Dynamic), (req, res) => {
        dynamicCtrl.SaveDynamic(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /dynamic/change_status/{id}:
     *   put:
     *     tags:
     *       - dynamic
     *     summary: Change Dynamic Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of dynamic that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Dynamic"
     *       404:
     *          description: Dynamic not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        dynamicCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /dynamic/get:
     *   get:
     *     tags:
     *       - dynamic
     *     summary: "List all dynamics"
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
        dynamicCtrl.GetDynamics(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /dynamic/delete/{id}:
     *   delete:
     *     tags:
     *       - dynamic
     *     summary: Delete the dynamic by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of dynamic that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        dynamicCtrl.DeleteDynamic(req, res);
    });
export default router;