import express              from 'express';
import * as guideCtrl       from '../controllers/guide.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: guide
 *     description: Guide  operations
 */


router.route('/add')

    /**
     * @swagger
     * /guide/add:
     *   put:
     *     tags:
     *       - guide
     *     summary: "Create a new Guide"
     *     security:
     *        - Bearer: []
     *     operationId: addGuide
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created guide object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/guide"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Guide"
     *       403:
     *          description: Guide not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Guide), (req, res) => {
        guideCtrl.SaveGuide(req, res);
    });


router.route('/upload_image')
    .post(validate(schema.CheckId), (req, res) => {
        guideCtrl.UploadGuideImage(req, res);
    });


router.route('/get_by_id/:id')

/**
 * @swagger
 * /guide/get_by_id/{id}:
 *   get:
 *     tags:
 *       - guide
 *     summary: Get the guide by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of guide that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Guide"
 *       404:
 *          description: Guide not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

    .get(validate(schema.CheckId), (req, res) => {
        guideCtrl.GetGuideById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /guide/modify:
     *   put:
     *     tags:
     *       - guide
     *     summary: Modify Guide By Id
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
     *         description: Updated guide object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Guide"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Guide"
     *       400:
     *         description: Invalid Guide
     */

    .put(validate(schema.Guide), (req, res) => {
        guideCtrl.SaveGuide(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /guide/change_status/{id}:
     *   put:
     *     tags:
     *       - guide
     *     summary: Change Guide Status
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of guide that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Guide"
     *       404:
     *          description: Guide not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        guideCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /guide/get:
     *   get:
     *     tags:
     *       - guide
     *     summary: "List all guide"
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
        guideCtrl.GetGuides(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /guide/delete/{id}:
     *   delete:
     *     tags:
     *       - guide
     *     summary: Delete the guide by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of guide that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        guideCtrl.DeleteGuide(req, res);
    });
export default router;