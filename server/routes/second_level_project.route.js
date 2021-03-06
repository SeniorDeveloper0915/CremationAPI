import express                          from 'express';
import * as projectCtrl                 from '../controllers/second_level_project.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: second level project
 *     description: Second Level Project operations
 */


router.route('/add')

    /**
     * @swagger
     * /second_level_project/add:
     *   put:
     *     tags:
     *       - second level project
     *     summary: "Create a new Second Level Project"
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
     *         description: Created second level project object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/second_level_project"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLeveLProject"
     *       403:
     *          description: Second Level Project not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.AddSecondLevelProject), (req, res) => {
        projectCtrl.AddProject(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /second_level_project/get_by_id/{id}:
     *   get:
     *     tags:
     *       - second level project
     *     summary: Get Second Level Project by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of second level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *       404:
     *          description: SecondLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetProjectById(req, res);
    });

router.route('/get/third/:id')
    /**
     * @swagger
     * /second_level_project/get/third/{id}:
     *   get:
     *     tags:
     *       - second level project
     *     summary: Get Third Level Project by Id
     *     operationId: getThirdById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of second level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *       404:
     *          description: SecondLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetThirdProject(req, res);
    });

router.route('/get/questions/:id')
    /**
     * @swagger
     * /second_level_project/get/questions/{id}:
     *   get:
     *     tags:
     *       - second level project
     *     summary: Get Questions by Id
     *     operationId: getQuestionsById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of second level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *       404:
     *          description: SecondLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetQuestions(req, res);
    });

router.route('/get/product/:id')
    /**
     * @swagger
     * /second_level_project/get/product/{id}:
     *   get:
     *     tags:
     *       - second level project
     *     summary: Get Products by Id
     *     operationId: getProductById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of second level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *       404:
     *          description: SecondLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetProduct(req, res);
    });
    
router.route('/modify')
    
    /**
     * @swagger
     * /second_level_project/modify:
     *   put:
     *     tags:
     *       - second level project
     *     summary: "Modify Second Level Project By Id"
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
     *         description: Updated Second Level Project object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *       400:
     *         description: Invalid SecondLevelProject
     */

    .put(validate(schema.ModifySecondLevelProject), (req, res) => {
        projectCtrl.ModifyProject(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /second_level_project/change_status/{id}:
     *   put:
     *     tags:
     *       - second level project
     *     summary: Change Second Level Project Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of second level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/SecondLevelProject"
     *       404:
     *          description: SecondLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        projectCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /second_level_project/get:
     *   get:
     *     tags:
     *       - second level project
     *     summary: "List all second level projects"
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
        projectCtrl.GetProjects(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /second_level_project/delete/{id}:
     *   delete:
     *     tags:
     *       - second level project
     *     summary: Delete the second level project by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of second level project that needs to be deleted
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