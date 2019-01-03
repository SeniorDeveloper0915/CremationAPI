import express              from 'express';
import * as userCtrl        from '../controllers/user.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: user
 *     description: User operations
 */


router.route('/add')

    /**
     * @swagger
     * /user/add:
     *   put:
     *     tags:
     *       - user
     *     summary: "Create a new User"
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
     *         description: Created user object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/user"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/User"
     *       403:
     *          description: User not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.User), (req, res) => {
        userCtrl.SaveUser(req, res);
    });


router.route('/upload_avatar')
    .post(validate(schema.CheckId), (req, res) => {
        userCtrl.UploadAvatarImage(req, res);
    });


router.route('/get_by_id/:id')

/**
 * @swagger
 * /user/get_by_id/{id}:
 *   get:
 *     tags:
 *       - user
 *     summary: Get the user by Id
 *     operationId: getById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of user that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *       404:
 *          description: User not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

    .get(validate(schema.CheckId), (req, res) => {
        userCtrl.GetUserById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /user/modify:
     *   put:
     *     tags:
     *       - user
     *     summary: Modify User By Id
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
     *         description: Updated user object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/User"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/User"
     *       400:
     *         description: Invalid User
     */

    .put(validate(schema.User), (req, res) => {
        userCtrl.SaveUser(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /user/get:
     *   get:
     *     tags:
     *       - user
     *     summary: "List all users"
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
        userCtrl.GetUsers(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /user/delete/{id}:
     *   delete:
     *     tags:
     *       - user
     *     summary: Delete the user by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of user that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        userCtrl.DeleteUser(req, res);
    });
export default router;