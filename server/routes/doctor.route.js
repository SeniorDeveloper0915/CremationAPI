import express                          from 'express';
import * as doctorCtrl                  from '../controllers/doctor.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: doctor
 *     description: Doctor operations
 */


router.route('/add')

    /**
     * @swagger
     * /doctor/add:
     *   put:
     *     tags:
     *       - doctor
     *     summary: "Create a new Doctor"
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
     *         description: Created doctor object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/doctor"
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

    .put(validate(schema.Doctor), (req, res) => {
        doctorCtrl.SaveDoctor(req, res);
    });

router.route('/upload_photo/:id')
    .post(validate(schema.CheckId), (req, res) => {
        doctorCtrl.UploadPhoto(req, res);
    });

router.route('/download_photo/:id')
    .get(validate(schema.CheckId), (req, res) => {
        doctorCtrl.DownloadPhoto(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /doctor/get_by_id/{id}:
     *   get:
     *     tags:
     *       - doctor
     *     summary: Get Doctor by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor that needs to be fetched
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

    .get(validate(schema.CheckId), (req, res) => {
        doctorCtrl.GetDoctorById(req, res);
    });
router.route('/get/featured')
    .get((req, res) => {
        doctorCtrl.GetFeatured(req, res);
    });

router.route('/get/filter')
    .get(validate(schema.CheckFilter), (req, res) => {
        doctorCtrl.GetFilter(req, res);
    });
    
router.route('/get/loadmore')
    .get(validate(schema.CheckLoadMore), (req, res) => {
        doctorCtrl.LoadMore(req, res);
    });
    
router.route('/get/skills/:id')
    /**
     * @swagger
     * /doctor/get/skills/{id}:
     *   get:
     *     tags:
     *       - doctor
     *     summary: Get Skills by Id
     *     operationId: getSkillsById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor that needs to be fetched
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

    .get(validate(schema.CheckId), (req, res) => {
        doctorCtrl.GetSkills(req, res);
    });

router.route('/get/cases/:id')
    /**
     * @swagger
     * /doctor/get/cases/{id}:
     *   get:
     *     tags:
     *       - doctor
     *     summary: Get Cases by Id
     *     operationId: getCasesById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor that needs to be fetched
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

    .get(validate(schema.CheckId), (req, res) => {
        doctorCtrl.GetCases(req, res);
    });

router.route('/modify')
    
    /**
     * @swagger
     * /doctor/modify:
     *   put:
     *     tags:
     *       - doctor
     *     summary: Modify Doctor By Id
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
     *         description: Updated Doctor object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Doctor"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Doctor"
     *       400:
     *         description: Invalid Doctor
     */

    .put(validate(schema.Doctor), (req, res) => {
        doctorCtrl.SaveProject(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /doctor/change_status/{id}:
     *   put:
     *     tags:
     *       - doctor
     *     summary: Change Doctor Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor that needs to be fetched
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
    .put(validate(schema.CheckId), (req, res) => {
        doctorCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /doctor/get:
     *   get:
     *     tags:
     *       - doctor
     *     summary: "List all doctors"
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
        doctorCtrl.GetDoctors(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /doctor/delete/{id}:
     *   delete:
     *     tags:
     *       - doctor
     *     summary: Delete the doctor by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        doctorCtrl.DeleteDoctor(req, res);
    });

router.route('/count')
    /**
     * @swagger
     * /doctor/count:
     *   get:
     *     tags:
     *       - doctor
     *     summary: "Doctor Count"
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
        doctorCtrl.Count(req, res);
    });

router.route('/search/:text')
    /**
     * @swagger
     * /doctor/search/{text}:
     *   get:
     *     tags:
     *       - doctor
     *     summary: "Search Doctor"
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