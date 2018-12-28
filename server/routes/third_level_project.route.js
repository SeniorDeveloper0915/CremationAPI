import express                          from 'express';
import * as projectCtrl                 from '../controllers/third_level_project.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: third level project
 *     description: Third Level Project operations
 */


router.route('/add')

    /**
     * @swagger
     * /third_level_project/add:
     *   put:
     *     tags:
     *       - third_level_project
     *     summary: "Create a new Third Level Project"
     *     security:
     *        - Bearer: []
     *     operationId: addThirdLevelProject
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created third level project object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/third_level_project"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/ThirdLeveLProject"
     *       403:
     *          description: Third Level Project not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.ThirdLevelProject), (req, res) => {
        projectCtrl.SaveProject(req, res);
    });

router.route('/upload_before_image/:id')
    .post(validate(schema.CheckId), (req, res) => {
        projectCtrl.UploadBeforeImage(req, res);
    });

router.route('/upload_effect_image/:id')
    .post(validate(schema.CheckId), (req, res) => {
        projectCtrl.UploadEffectImage(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /third_level_project/get_by_id/{id}:
     *   get:
     *     tags:
     *       - third level project
     *     summary: Get Third Level Project by ID
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of third level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/ThirdLevelProject"
     *       404:
     *          description: ThirdLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetProjectById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /third_level_project/modify:
     *   put:
     *     tags:
     *       - third level project
     *     summary: "Modify Third Level Project By Id"
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
     *         description: Updated Third Level Project object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/ThirdLevelProject"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/ThirdLevelProject"
     *       400:
     *         description: Invalid ThirdLevelProject
     */

    .put(validate(schema.ThirdLevelProject), (req, res) => {
        projectCtrl.SaveProject(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /third_level_project/change_status/{id}:
     *   put:
     *     tags:
     *       - third level project
     *     summary: Change Third Level Project Status
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of third level project that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/ThirdLevelProject"
     *       404:
     *          description: ThirdLevelProject not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        projectCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /third_level_project/get:
     *   get:
     *     tags:
     *       - third level project
     *     summary: "List all third level projects"
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
     * /third_level_project/delete/{id}:
     *   delete:
     *     tags:
     *       - third level project
     *     summary: Delete the third level project by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of third level project that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete((req, res) => {
        projectCtrl.DeleteProject(req, res);
    });

router.route('/count')
    /**
     * @swagger
     * /third_level_project/count:
     *   get:
     *     tags:
     *       - project count
     *     summary: "Count Project"
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
        projectCtrl.Count(req, res);
    });
export default router;