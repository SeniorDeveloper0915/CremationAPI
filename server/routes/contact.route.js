import express                          from 'express';
import * as koreanCtrl                  from '../controllers/korean_medicine.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: korean medicine
 *     description: Korean Medicine operations
 */


router.route('/modify')
    
    /**
     * @swagger
     * /korean/modify:
     *   put:
     *     tags:
     *       - korean medicine
     *     summary: "Modify Korean Medicine By Id"
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
     *         description: Updated Korean Medicine object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/KoreanMedicine"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/KoreanMedicine"
     *       400:
     *         description: Invalid KoreanMedicine
     */

    .put(validate(schema.KoreanMedicine), (req, res) => {
        koreanCtrl.ModifyKorean(req, res);
    });


router.route('/get')

    /**
     * @swagger
     * /korean/get:
     *   get:
     *     tags:
     *       - korean medicine
     *     summary: Get Korean Medicine
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of korean medicine that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/KoreanMedicine"
     *       404:
     *          description: KoreanMedicine not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        projectCtrl.GetKoreanById(req, res);
    });

export default router;