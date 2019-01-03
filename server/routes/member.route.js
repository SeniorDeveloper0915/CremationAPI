import express              from 'express';
import * as memberCtrl      from '../controllers/member.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: member
 *     description: Member operations
 */


router.route('/add')

    /**
     * @swagger
     * /member/add:
     *   put:
     *     tags:
     *       - member
     *     summary: "Create a new Member"
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
     *         description: Created member object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/member"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Member"
     *       403:
     *          description: Member not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Member), (req, res) => {
        memberCtrl.SaveMember(req, res);
    });


router.route('/upload_image')
    .post(validate(schema.CheckId), (req, res) => {
        memberCtrl.UploadMemberImage(req, res);
    });


router.route('/get_by_id/:id')

    /**
     * @swagger
     * /member/get_by_id/{id}:
     *   get:
     *     tags:
     *       - member
     *     summary: Get the member by ID
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of member that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Member"
     *       404:
     *          description: Member not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        memberCtrl.GetMemberById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /member/modify:
     *   put:
     *     tags:
     *       - member
     *     summary: Modify Member By Id
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
     *         description: Updated member object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Member"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Member"
     *       400:
     *         description: Invalid Member
     */

    .put(validate(schema.Member), (req, res) => {
        memberCtrl.SaveMember(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /member/change_status/{id}:
     *   put:
     *     tags:
     *       - member
     *     summary: Change Member Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of member that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Member"
     *       404:
     *          description: Member not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        memberCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /member/get:
     *   get:
     *     tags:
     *       - member
     *     summary: "List all members"
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
        memberCtrl.GetMembers(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /member/delete/{id}:
     *   delete:
     *     tags:
     *       - member
     *     summary: Delete the member by ID
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of member that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        memberCtrl.DeleteMember(req, res);
    });
export default router;