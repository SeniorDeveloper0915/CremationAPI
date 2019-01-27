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
     *       - question and answer
     *     summary: "Create a new Question"
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
     *       - question and answer
     *     summary: Answer about Question
     *     security:
     *       - Bearer: []
     *     operationId: answer
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
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

router.route('/increase/:id')
    .put(validate(schema.CheckId), (req, res) => {
        qaCtrl.Increase(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /qa/get_by_id/{id}:
     *   get:
     *     tags:
     *       - question and answer
     *     summary: Get Question by Id
     *     operationId: fetById
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

router.route('/get/loadmore')
    .get(validate(schema.CheckLoadMore), (req, res) => {
        qaCtrl.LoadMore(req, res);
    });
    
router.route('/get')
    /**
     * @swagger
     * /qa/get:
     *   get:
     *     tags:
     *       - question and answer
     *     summary: "List all question & answers"
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
        qaCtrl.GetQas(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /qa/delete/{id}:
     *   delete:
     *     tags:
     *       - question and answer
     *     summary: Delete the qa by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
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
     *       - question and answer
     *     summary: "Question & Answers"
     *     operationId: count
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

router.route('/search/:text')
    /**
     * @swagger
     * /qa/search/{text}:
     *   get:
     *     tags:
     *       - question and answer
     *     summary: "Search Question"
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