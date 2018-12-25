import express                          from 'express';
import * as doctorCtrl                  from '../controllers/doctor.controller';
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
     * /doctor/add:
     *   put:
     *     tags:
     *       - doctor
     *     summary: "Create a new Doctor"
     *     security:
     *        - Bearer: []
     *     operationId: addDoctor
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

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /doctor/get_by_id/{id}:
     *   get:
     *     tags:
     *       - doctor
     *     summary: Get Doctor by ID
     *     operationId: findById
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
     *     operationId: findById
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
        doctorCtrl.GetDoctors(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /doctor/delete/{id}:
     *   delete:
     *     tags:
     *       - doctor
     *     summary: Delete the doctor by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
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
    .delete((req, res) => {
        doctorCtrl.DeleteDoctor(req, res);
    });

export default router;