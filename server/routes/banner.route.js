import express              from 'express';
import * as bannerCtrl      from '../controllers/banner.controller';
import isAuthenticated      from '../middlewares/authenticate';
import validate             from '../config/joi.validate';
import schema               from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: banner
 *     description: Banner operations
 */


router.route('/add')

    /**
     * @swagger
     * /banner/add:
     *   put:
     *     tags:
     *       - banner
     *     summary: "Create a new Banner"
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
     *         description: Created banner object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/banner"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Banner"
     *       403:
     *          description: Banner not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Banner), (req, res) => {
        bannerCtrl.SaveBanner(req, res);
    });


router.route('/upload_image/:id')
    .post(validate(schema.CheckId), (req, res) => {
        bannerCtrl.UploadBannerImage(req, res);
    });

router.route('/download_image/:id')
    .get(validate(schema.CheckId), (req, res) => {
        bannerCtrl.DownloadBannerImage(req, res);
    });
    
router.route('/get_by_id/:id')

/**
 * @swagger
 * /banner/get_by_id/{id}:
 *   get:
 *     tags:
 *       - banner
 *     summary: Get the banner by id
 *     operationId: get_by_id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of banner that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Banner"
 *       404:
 *          description: Banner not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

    .get(validate(schema.CheckId), (req, res) => {
        bannerCtrl.GetBannerById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /banner/modify:
     *   put:
     *     tags:
     *       - banner
     *     summary: Modify Banner By Id
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
     *         description: Updated banner object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Banner"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Banner"
     *       400:
     *         description: Invalid Banner
     */

    .put(validate(schema.Banner), (req, res) => {
        bannerCtrl.SaveBanner(req, res);
    });

router.route('/change_status/:id')

    /**
     * @swagger
     * /banner/change_status/{id}:
     *   put:
     *     tags:
     *       - banner
     *     summary: Change Banner Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of banner that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Banner"
     *       404:
     *          description: Banner not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.CheckId), (req, res) => {
        bannerCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    
    /**
     * @swagger
     * /banner/get:
     *   get:
     *     tags:
     *       - banner
     *     summary: "List all banners"
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
        bannerCtrl.GetBanners(req, res);
    });


router.route('/delete/:id')

    /**
     * @swagger
     * /banner/delete/{id}:
     *   delete:
     *     tags:
     *       - banner
     *     summary: Delete the banner by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of banner that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete(validate(schema.CheckId), (req, res) => {
        bannerCtrl.DeleteBanner(req, res);
    });
export default router;