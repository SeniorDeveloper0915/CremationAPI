import express              from 'express';
import * as caseCtrl        from '../controllers/case.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: case
 *     description: Case operations
 */


router.route('/add')

    /**
     * @swagger
     * /case/add:
     *   put:
     *     tags:
     *       - case
     *     summary: "Create a new Case"
     *     security:
     *        - Bearer: []
     *     operationId: addCase
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created case object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/case"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Case"
     *       403:
     *          description: Case not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Case), (req, res) => {
        caseCtrl.SaveCase(req, res);
    });


router.route('/upload_image')
    .post(validate(schema.CheckId), (req, res) => {
        caseCtrl.UploadCaseImage(req, res);
    });


router.route('/get_by_id/:id')

/**
 * @swagger
 * /case/get_by_id/{id}:
 *   get:
 *     tags:
 *       - case
 *     summary: Get the case by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of case that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Case"
 *       404:
 *          description: Case not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

    .get(validate(schema.CheckId), (req, res) => {
        caseCtrl.GetCaseById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /case/modify:
     *   put:
     *     tags:
     *       - case
     *     summary: Modify Case By Id
     *     security:
     *       - Bearer: []
     *     operationId: update
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id that need to be updated
     *         required: true
     *         type: integer
     *       - name: body
     *         in: body
     *         description: Updated case object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Case"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Case"
     *       400:
     *         description: Invalid Case
     */

    .put(validate(schema.Case), (req, res) => {
        caseCtrl.SaveCase(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /case/change_status/{id}:
     *   put:
     *     tags:
     *       - case
     *     summary: Change Case Status
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of case that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Case"
     *       404:
     *          description: Case not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        caseCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /case/get:
     *   get:
     *     tags:
     *       - case
     *     summary: "List all cases"
     *     operationId: findAll
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
        caseCtrl.GetCases(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /case/delete/{id}:
     *   delete:
     *     tags:
     *       - case
     *     summary: Delete the case by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of case that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        caseCtrl.DeleteCase(req, res);
    });
export default router;