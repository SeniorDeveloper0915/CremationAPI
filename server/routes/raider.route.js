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
     *     operationId: addRaider
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

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /raider/get_by_id/{id}:
     *   get:
     *     tags:
     *       - raider
     *     summary: Get Raider by ID
     *     operationId: findById
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


router.route('/change_status/:id')

    /**
     * @swagger
     * /raider/change_status/{id}:
     *   put:
     *     tags:
     *       - raider
     *     summary: Change Raider Status
     *     operationId: findById
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


router.route('/get')
    /**
     * @swagger
     * /raider/get:
     *   get:
     *     tags:
     *       - raider
     *     summary: "List all raiders"
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
        raiderCtrl.GetRaiders(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /raider/delete/{id}:
     *   delete:
     *     tags:
     *       - raider
     *     summary: Delete the raider by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
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

export default router;