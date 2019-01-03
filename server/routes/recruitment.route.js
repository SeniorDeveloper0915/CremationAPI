import express                          from 'express';
import * as recruitmentCtrl             from '../controllers/recruitment.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: recruitment
 *     description: Recruitment operations
 */


router.route('/modify')
    
    /**
     * @swagger
     * /recruitment/modify:
     *   put:
     *     tags:
     *       - recruitment
     *     summary: "Modify Recruitment By Id"
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
     *         description: Updated Recruitment object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Recruitment"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Recruitment"
     *       400:
     *         description: Invalid Recruitment
     */

    .put(validate(schema.Recruitment), (req, res) => {
        recruitmentCtrl.ModifyRecruitment(req, res);
    });


router.route('/get')

    /**
     * @swagger
     * /Recruitment/get:
     *   get:
     *     tags:
     *       - recruitment
     *     summary: Get Recruitment
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of Recruitment that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Recruitment"
     *       404:
     *          description: Recruitment not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        recruitmentCtrl.GetRecruitmentById(req, res);
    });

export default router;