import express                          from 'express';
import * as projectCtrl                 from '../controllers/first_level_project.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: first level project
 *     description: First Level Project operations
 */


router.route('/add')

    /**
     * @swagger
     * /first_level_project/add:
     *   put:
     *     tags:
     *       - first level project
     *     summary: "Create a new First Level Project"
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
     *         description: Created first level project object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/first_level_project"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLeveLProject"
     *       403:
     *          description: First Level Project not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.AddFirstLevelProject), (req, res) => {
        projectCtrl.AddProject(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /first_level_project/get_by_id/{id}:
     *   get:
     *     tags:
     *       - first level project
     *     summary: Get First Level Project by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       404:
     *          description: FirstLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetProjectById(req, res);
    });


router.route('/get/second/:id')
    /**
     * @swagger
     * /first_level_project/get/second/{id}:
     *   get:
     *     tags:
     *       - first level project
     *     summary: Get Second Level Project by Id
     *     operationId: getSecondById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       404:
     *          description: FirstLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetSecondProject(req, res);
    });

router.route('/get/third/:id')
    /**
     * @swagger
     * /first_level_project/get/third/{id}:
     *   get:
     *     tags:
     *       - first level project
     *     summary: Get Third Level Project by Id
     *     operationId: getThirdById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       404:
     *          description: FirstLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetThirdProject(req, res);
    });

router.route('/get/questions/:id')
    /**
     * @swagger
     * /first_level_project/get/questions/{id}:
     *   get:
     *     tags:
     *       - first level project
     *     summary: Get Questions by Id
     *     operationId: getQuestionsById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       404:
     *          description: FirstLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetQuestions(req, res);
    });

router.route('/get/product/:id')
    /**
     * @swagger
     * /first_level_project/get/product/{id}:
     *   get:
     *     tags:
     *       - first level project
     *     summary: Get Products by Id
     *     operationId: getProductById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       404:
     *          description: FirstLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetProduct(req, res);
    });

router.route('/modify')
    
    /**
     * @swagger
     * /first_level_project/modify:
     *   put:
     *     tags:
     *       - first level project
     *     summary: Modify First Level Project By Id
     *     security:
     *       - Bearer: []
     *     operationId: modify
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
     *         description: Updated First Level Project object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       400:
     *         description: Invalid FirstLevelProject
     */

    .put(validate(schema.ModifyFirstLevelProject), (req, res) => {
        projectCtrl.ModifyProject(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /first_level_project/change_status/{id}:
     *   put:
     *     tags:
     *       - first level project
     *     summary: Change First Level Project Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/FirstLevelProject"
     *       404:
     *          description: FirstLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        projectCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /first_level_project/get:
     *   get:
     *     tags:
     *       - first level project
     *     summary: "List all first level projects"
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
        projectCtrl.GetProjects(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /first_level_project/delete/{id}:
     *   delete:
     *     tags:
     *       - first level project
     *     summary: Delete the first level project by ID
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of first level project that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        projectCtrl.DeleteProject(req, res);
    });

export default router;