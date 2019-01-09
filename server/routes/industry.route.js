import express              from 'express';
import * as industryCtrl    from '../controllers/industry.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: industry
 *     description: Industry operations
 */


router.route('/add')

    /**
     * @swagger
     * /industry/add:
     *   put:
     *     tags:
     *       - industry
     *     summary: "Create a new Industry"
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
     *         description: Created industry object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/industry"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Industry"
     *       403:
     *          description: Industry not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Industry), (req, res) => {
        industryCtrl.SaveIndustry(req, res);
    });


router.route('/upload_image/:id')
    .post(validate(schema.CheckId), (req, res) => {
        industryCtrl.UploadIndustryImage(req, res);
    });

router.route('/download_image/:id')
    .get(validate(schema.CheckId), (req, res) => {
        industryCtrl.DownloadIndustryImage(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /industry/get_by_id/{id}:
     *   get:
     *     tags:
     *       - industry
     *     summary: Get the industry by ID
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of industry that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Industry"
     *       404:
     *          description: Industry not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        industryCtrl.GetIndustryById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /industry/modify:
     *   put:
     *     tags:
     *       - industry
     *     summary: Modify Industry By Id
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
     *         description: Updated industry object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Industry"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Industry"
     *       400:
     *         description: Invalid Industry
     */

    .put(validate(schema.Industry), (req, res) => {
        industryCtrl.SaveIndustry(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /industry/change_status/{id}:
     *   put:
     *     tags:
     *       - industry
     *     summary: Change Industry Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of industry that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Industry"
     *       404:
     *          description: Industry not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        industryCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /industry/get:
     *   get:
     *     tags:
     *       - industry
     *     summary: "List all industries"
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
        industryCtrl.GetIndustries(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /industry/delete/{id}:
     *   delete:
     *     tags:
     *       - industry
     *     summary: Delete the industry by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of industry that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        industryCtrl.DeleteIndustry(req, res);
    });
export default router;