import express                          from 'express';
import * as contactCtrl                 from '../controllers/contact.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: contact us
 *     description: Cotact US operations
 */


router.route('/modify')
    
    /**
     * @swagger
     * /contact/modify:
     *   put:
     *     tags:
     *       - contact us
     *     summary: "Modify Contact Us By Id"
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
     *         description: Updated Contact Us object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/ContactUs"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/ContactUs"
     *       400:
     *         description: Invalid ContactUs
     */

    .put(validate(schema.ContactUs), (req, res) => {
        contactCtrl.ModifyContact(req, res);
    });

    router.route('/upload_image')
        .post(validate(schema.CheckId), (req, res) => {
            contactCtrl.UploadContactImage(req, res);
        });

router.route('/get')

    /**
     * @swagger
     * /contact/get:
     *   get:
     *     tags:
     *       - contact us
     *     summary: Get Contact Us
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of contact us that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/ContactUs"
     *       404:
     *          description: ContactUs not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        contactCtrl.GetContactById(req, res);
    });

export default router;