import express                          from 'express';
import * as categoryCtrl                from '../controllers/raider_category.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: raider category
 *     description: Raider Category operations
 */


router.route('/add')

    /**
     * @swagger
     * /raider_category/add:
     *   put:
     *     tags:
     *       - raider_category
     *     summary: "Create a new Raider Category"
     *     security:
     *        - Bearer: []
     *     operationId: addRaiderCategory
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created raider category object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/raider_category"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/RaiderCategory"
     *       403:
     *          description: Raider Category not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.RaiderCategory), (req, res) => {
        categoryCtrl.AddCategory(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /raider_category/get_by_id/{id}:
     *   get:
     *     tags:
     *       - raider category
     *     summary: Get Raider Category by ID
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of raider category that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/RaiderCategory"
     *       404:
     *          description: RaiderCategory not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        categoryCtrl.GetCategoryById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /raider_category/modify:
     *   put:
     *     tags:
     *       - raider category
     *     summary: "Modify Raider Category By Id"
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
     *         description: Updated Raider Category object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/RaiderCategory"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/RaiderCategory"
     *       400:
     *         description: Invalid RaiderCategory
     */

    .put(validate(schema.ModifyRaiderCategory), (req, res) => {
        categoryCtrl.ModifyCategory(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /raider_category/change_status/{id}:
     *   put:
     *     tags:
     *       - raider category
     *     summary: Change Raider Category Status
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of raider category that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/RaiderCategory"
     *       404:
     *          description: RaiderCategory not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        categoryCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /raider_category/get:
     *   get:
     *     tags:
     *       - raider category
     *     summary: "List all Raider Categories"
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
        categoryCtrl.GetCategories(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /raider_category/delete/{id}:
     *   delete:
     *     tags:
     *       - raider_category
     *     summary: Delete the raider category by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of raider category that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        categoryCtrl.DeleteCategory(req, res);
    });

export default router;