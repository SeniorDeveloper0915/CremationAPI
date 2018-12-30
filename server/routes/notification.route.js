import express                      from 'express';
import * as notificationCtrl        from '../controllers/notification.controller';
import isAuthenticated              from '../middlewares/authenticate';
import validate                     from '../config/joi.validate';
import schema                       from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: notification
 *     description: Notification operations
 */


router.route('/add')

    /**
     * @swagger
     * /notification/add:
     *   put:
     *     tags:
     *       - notification
     *     summary: "Create a new Notification"
     *     security:
     *        - Bearer: []
     *     operationId: addBanner
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         description: Created notification object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/notification"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Notification"
     *       403:
     *          description: Notification not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Notification), (req, res) => {
        notificationCtrl.SaveNotification(req, res);
    });


router.route('/upload_image/:id')
    .post(validate(schema.CheckId), (req, res) => {
        notificationCtrl.UploadNotificationImage(req, res);
    });

router.route('/download_image/:id')
    .get(validate(schema.CheckId), (req, res) => {
        notificationCtrl.DownloadNotificationImage(req, res);
    });
router.route('/get_by_id/:id')

/**
 * @swagger
 * /notification/get_by_id/{id}:
 *   get:
 *     tags:
 *       - notification
 *     summary: Get the notification by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of notification that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Notification"
 *       404:
 *          description: Notification not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

    .get(validate(schema.CheckId), (req, res) => {
        notificationCtrl.GetNotificationById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /notification/modify:
     *   put:
     *     tags:
     *       - notification
     *     summary: Modify Notification By Id
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
     *         description: Updated notification object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Notification"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Notification"
     *       400:
     *         description: Invalid Notification
     */

    .put(validate(schema.Notification), (req, res) => {
        notificationCtrl.SaveNotification(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /notification/change_status/{id}:
     *   put:
     *     tags:
     *       - notification
     *     summary: Change Notification Status
     *     operationId: findById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of notification that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Notification"
     *       404:
     *          description: Notification not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        notificationCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /notification/get:
     *   get:
     *     tags:
     *       - notification
     *     summary: "List all banners"
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
        notificationCtrl.GetNotifications(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /notification/delete/{id}:
     *   delete:
     *     tags:
     *       - notification
     *     summary: Delete the notification by ID
     *     security:
     *       - Bearer: []
     *     operationId: destroy
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of notification that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        notificationCtrl.DeleteNotification(req, res);
    });
export default router;