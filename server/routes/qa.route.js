import express                          from 'express';
import * as qaCtrl                      from '../controllers/qa.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: question and answer
 *     description: Question & Answer operations
 */


router.route('/question')

    /**
     * @swagger
     * /qa/add:
     *   post:
     *     tags:
     *       - qa
     *     summary: "Create a new Question"
     *     security:
     *        - Bearer: []
     *     operationId: addQuestion
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created questoin object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/qa"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Question"
     *       403:
     *          description: Question not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.Question), (req, res) => {
        qaCtrl.SaveQuestion(req, res);
    });

router.route('/answer')
    
    /**
     * @swagger
     * /qa/answer:
     *   put:
     *     tags:
     *       - qa
     *     summary: Answer about Question
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
     *         description: Updated Question & Answer object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Answer"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Answer"
     *       400:
     *         description: Invalid Answer
     */

    .put(validate(schema.Answer), (req, res) => {
        qaCtrl.SaveAnswer(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /qa/get_by_id/{id}:
     *   get:
     *     tags:
     *       - qa
     *     summary: Get Question by ID
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of qa that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Question"
     *       404:
     *          description: Question not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        qaCtrl.GetQuestionById(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /qa/get:
     *   get:
     *     tags:
     *       - qa
     *     summary: "List all question & answers"
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
        qaCtrl.GetQas(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /qa/delete/{id}:
     *   delete:
     *     tags:
     *       - qa
     *     summary: Delete the qa by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of qa that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        qaCtrl.DeleteQa(req, res);
    });

router.route('/count')
    /**
     * @swagger
     * /qa/count:
     *   get:
     *     tags:
     *       - question and answer count
     *     summary: "Question & Answers"
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
        qaCtrl.Count(req, res);
    });

export default router;