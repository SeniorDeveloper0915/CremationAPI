import express                          from 'express';
import * as skillCtrl                   from '../controllers/skill.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: skill
 *     description: Skill operations
 */


router.route('/get')

    /**
     * @swagger
     * /skill/get_first/{id}:
     *   get:
     *     tags:
     *       - skill
     *     summary: Get Doctor by first level project id
     *     operationId: findById
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
     *           $ref: "#/definitions/Doctor"
     *       404:
     *          description: Doctor not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckSkill), (req, res) => {
        skillCtrl.GetDoctor(req, res);
    });


export default router;