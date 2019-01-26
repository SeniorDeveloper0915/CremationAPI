import express                          from 'express';
import * as raiderCtrl                  from '../controllers/raider.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: raider
 *     description: Raider operations
 */


router.route('/add')

    /**
     * @swagger
     * /raider/add:
     *   put:
     *     tags:
     *       - raider
     *     summary: "Create a new Raider"
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
     *         description: Created raider object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/raider"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Raider"
     *       403:
     *          description: Third Level Project not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Raider), (req, res) => {
        raiderCtrl.SaveRaider(req, res);
    });

router.route('/upload_image/:id')
    .post(validate(schema.CheckId), (req, res) => {
        raiderCtrl.UploadRaiderImage(req, res);
    });

router.route('/download_image/:id')
    .get(validate(schema.CheckId), (req, res) => {
        raiderCtrl.DownloadRaiderImage(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /raider/get_by_id/{id}:
     *   get:
     *     tags:
     *       - raider
     *     summary: Get Raider by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of raider that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Raider"
     *       404:
     *          description: Raider not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        raiderCtrl.GetRaiderById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /raider/modify:
     *   put:
     *     tags:
     *       - raider
     *     summary: "Modify Raider By Id"
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
     *         description: Updated Raider object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Raider"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Raider"
     *       400:
     *         description: Invalid Raider
     */

    .put(validate(schema.Raider), (req, res) => {
        raiderCtrl.SaveRaider(req, res);
    });

router.route('/increase/:id')
    .put(validate(schema.CheckId), (req, res) => {
        raiderCtrl.Increase(req, res);
    });
    
router.route('/change_status/:id')

    /**
     * @swagger
     * /raider/change_status/{id}:
     *   put:
     *     tags:
     *       - raider
     *     summary: Change Raider Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of raider that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Raider"
     *       404:
     *          description: Raider not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        raiderCtrl.ChangeStatus(req, res);
    });

router.route('/get/loadmore')
    .get((req, res) => {
        raiderCtrl.LoadMore(req, res);
    });
    
router.route('/get')
    /**
     * @swagger
     * /raider/get:
     *   get:
     *     tags:
     *       - raider
     *     summary: "List all raiders"
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
        raiderCtrl.GetRaiders(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /raider/delete/{id}:
     *   delete:
     *     tags:
     *       - raider
     *     summary: Delete the raider by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of raider that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete((req, res) => {
        raiderCtrl.DeleteRaider(req, res);
    });

router.route('/search/:text')
    /**
     * @swagger
     * /raider/search/{text}:
     *   get:
     *     tags:
     *       - raider
     *     summary: "Search Raiders"
     *     operationId: search
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
    .get(validate(schema.CheckText), (req, res) => {
        doctorCtrl.Search(req, res);
    });
export default router;