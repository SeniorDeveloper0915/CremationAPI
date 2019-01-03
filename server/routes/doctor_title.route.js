import express                          from 'express';
import * as doctorTitleCtrl             from '../controllers/doctor_title.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: doctor title
 *     description: Doctor Title operations
 */


router.route('/add')

    /**
     * @swagger
     * /doctor_title/add_doctor_title:
     *   put:
     *     tags:
     *       - doctor title
     *     summary: "Create a new Doctor Title"
     *     security:
     *        - Bearer: []
     *     operationId: addDoctorTitle
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created doctor title object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/doctor_title"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/DoctorTitle"
     *       403:
     *          description: Doctor Title not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .post(validate(schema.DoctorTitle), (req, res) => {
        doctorTitleCtrl.AddDoctorTitle(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /doctor_title/get_by_id/{id}:
     *   get:
     *     tags:
     *       - doctor title
     *     summary: Get Doctor Title by ID
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor title that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/DoctorTitle"
     *       404:
     *          description: DoctorTitle not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        doctorTitleCtrl.GetDoctorTitleById(req, res);
    });

router.route('/get/doctors/:id')

    /**
     * @swagger
     * /doctor_title/get/doctors/{id}:
     *   get:
     *     tags:
     *       - doctor title
     *     summary: Get Doctors by Doctor Title
     *     operationId: getDoctorsById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor title that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/DoctorTitle"
     *       404:
     *          description: DoctorTitle not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        doctorTitleCtrl.GetDoctors(req, res);
    });

router.route('/modify')
    
    /**
     * @swagger
     * /doctor_title/modify:
     *   put:
     *     tags:
     *       - doctor title
     *     summary: "Modify Doctor Title By Id"
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
     *         description: Updated Doctor Title object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/DoctorTitle"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/DoctorTitle"
     *       400:
     *         description: Invalid DoctorTitle
     */

    .put(validate(schema.ModifyDoctorTitle), (req, res) => {
        doctorTitleCtrl.ModifyDoctorTitle(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /doctor_title/get:
     *   get:
     *     tags:
     *       - doctor title
     *     summary: "List all doctor titles"
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
        doctorTitleCtrl.GetDoctorTitles(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /doctor_title/delete/{id}:
     *   delete:
     *     tags:
     *       - doctor title
     *     summary: Delete the doctor title by ID
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of doctor title that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        doctorTitleCtrl.DeleteDoctorTitle(req, res);
    });

export default router;