import express                          from 'express';
import * as nationCtrl                  from '../controllers/nation.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: nation
 *     description: Nation operations
 */



router.route('/get_by_id/:id')

    /**
     * @swagger
     * /nation/get_by_id/{id}:
     *   get:
     *     tags:
     *       - natnio
     *     summary: Get Nation by ID
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of nation that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Nation"
     *       404:
     *          description: Nation not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        nationCtrl.GetNationById(req, res);
    });



router.route('/get')
    /**
     * @swagger
     * /nation/get:
     *   get:
     *     tags:
     *       - nation
     *     summary: "List all nations"
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
        nationCtrl.GetNations(req, res);
    });


export default router;