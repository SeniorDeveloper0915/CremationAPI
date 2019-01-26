import express                          from 'express';
import * as hospitalCtrl                from '../controllers/hospital.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: hospital
 *     description: Hospital operations
 */


router.route('/add')

    /**
     * @swagger
     * /hospital/add:
     *   put:
     *     tags:
     *       - hospital
     *     summary: "Create a new hospital"
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
     *         description: Created hospital object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/hospital"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hospital"
     *       403:
     *          description: Hospital not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Hospital), (req, res) => {
        hospitalCtrl.SaveHospital(req, res);
    });

router.route('/upload_logo/:id')
    .post(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.UploadLogo(req, res);
    });

router.route('/download_logo/:id')
    .get(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.DownloadLogo(req, res);
    });

router.route('/upload_publicity/:id')
    .post(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.UploadPublicity(req, res);
    });

router.route('/download_publicity/:selection/:id')
    .get(validate(schema.CheckPublicity), (req, res) => {
        hospitalCtrl.DownloadPublicity(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /hospital/get_by_id/{id}:
     *   get:
     *     tags:
     *       - hospital
     *     summary: Get Hispital by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of hospital that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hispital"
     *       404:
     *          description: Hispital not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.GetHospitalById(req, res);
    });

router.route('/get/featured')
    .get((req, res) => {
        hospitalCtrl.GetFeatured(req, res);
    });

router.route('/get/loadmore')
    .get((req, res) => {
        hospitalCtrl.LoadMore(req, res);
    });
    
router.route('/get/services/:id')
    /**
     * @swagger
     * /hospital/get/services/{id}:
     *   get:
     *     tags:
     *       - hospital
     *     summary: Get Services by Id
     *     operationId: getServicesById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of hospital that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hospital"
     *       404:
     *          description: Hospital not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.GetServices(req, res);
    });

router.route('/get/teams/:id')
    /**
     * @swagger
     * /hospital/get/teams/{id}:
     *   get:
     *     tags:
     *       - hospital
     *     summary: Get Teams by Id
     *     operationId: getTeamsById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of hospital that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hospital"
     *       404:
     *          description: Hospital not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.GetTeams(req, res);
    });

router.route('/get/cases/:id')
    /**
     * @swagger
     * /hospital/get/cases/{id}:
     *   get:
     *     tags:
     *       - hospital
     *     summary: Get Cases by Id
     *     operationId: getCasesById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of hospital that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hospital"
     *       404:
     *          description: Hospital not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.GetCases(req, res);
    });

router.route('/modify')
    
    /**
     * @swagger
     * /hospital/modify:
     *   put:
     *     tags:
     *       - hospital
     *     summary: Modify Hispital By Id
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
     *         description: Updated Hispital object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Hispital"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hispital"
     *       400:
     *         description: Invalid Hispital
     */

    .put(validate(schema.Hispital), (req, res) => {
        hospitalCtrl.SaveHispital(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /hospital/change_status/{id}:
     *   put:
     *     tags:
     *       - hospital
     *     summary: Change Hispital Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of hospital that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Hispital"
     *       404:
     *          description: Hispital not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /hospital/get:
     *   get:
     *     tags:
     *       - hospital
     *     summary: "List all hospitals"
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
        hospitalCtrl.GetHospitals(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /hospital/delete/{id}:
     *   delete:
     *     tags:
     *       - hospital
     *     summary: Delete the hospital by ID
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of hospital that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        hospitalCtrl.DeleteHospital(req, res);
    });

router.route('/count')
    /**
     * @swagger
     * /hospital/count:
     *   get:
     *     tags:
     *       - hospital
     *     summary: "Hospital Count"
     *     operationId: Count
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
        hospitalCtrl.Count(req, res);
    });

router.route('/search/:text')
    /**
     * @swagger
     * /hospital/search/{text}:
     *   get:
     *     tags:
     *       - hospital
     *     summary: "Search hospital"
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
        hospitalCtrl.Search(req, res);
    });

export default router;