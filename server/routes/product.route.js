import express                          from 'express';
import * as productCtrl                 from '../controllers/product.controller';
import isAuthenticated                  from '../middlewares/authenticate';
import validate                         from '../config/joi.validate';
import schema                           from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: product
 *     description: Product operations
 */


router.route('/add')

    /**
     * @swagger
     * /product/add:
     *   put:
     *     tags:
     *       - product
     *     summary: "Create a new product"
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
     *         description: Created product object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/product"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Product"
     *       403:
     *          description: Product not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .put(validate(schema.Product), (req, res) => {
        productCtrl.SaveProduct(req, res);
    });

router.route('/upload_cover/:id')
    .post(validate(schema.CheckId), (req, res) => {
        productCtrl.UploadCover(req, res);
    });

router.route('/upload_promotion/:id')
    .post(validate(schema.CheckId), (req, res) => {
        productCtrl.UploadPromotion(req, res);
    });

router.route('/get_by_id/:id')

    /**
     * @swagger
     * /product/get_by_id/{id}:
     *   get:
     *     tags:
     *       - product
     *     summary: Get Product by Id
     *     operationId: getById
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of product that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Product"
     *       404:
     *          description: Product not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */

    .get(validate(schema.CheckId), (req, res) => {
        productCtrl.GetProductById(req, res);
    });


router.route('/modify')
    
    /**
     * @swagger
     * /product/modify:
     *   put:
     *     tags:
     *       - product
     *     summary: Modify Product By Id
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
     *         description: Updated Product object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Product"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Product"
     *       400:
     *         description: Invalid Product
     */

    .put(validate(schema.Product), (req, res) => {
        productCtrl.SaveProduct(req, res);
    });


router.route('/change_status/:id')

    /**
     * @swagger
     * /product/change_status/{id}:
     *   put:
     *     tags:
     *       - product
     *     summary: Change Product Status
     *     operationId: changeStatus
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of product that needs to be fetched
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Product"
     *       404:
     *          description: Product not found
     *          schema:
     *             $ref: '#/definitions/Error'
     */
    .put(validate(schema.CheckId), (req, res) => {
        productCtrl.ChangeStatus(req, res);
    });


router.route('/get')
    /**
     * @swagger
     * /product/get:
     *   get:
     *     tags:
     *       - product
     *     summary: "List all products"
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
        productCtrl.GetProducts(req, res);
    });


router.route('/delete/:id')
    /**
     * @swagger
     * /product/delete/{id}:
     *   delete:
     *     tags:
     *       - product
     *     summary: Delete the product by Id
     *     security:
     *       - Bearer: []
     *     operationId: delete
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: id of product that needs to be deleted
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *          description: "Invalid ID"
     */
    .delete((req, res) => {
        productCtrl.Deleteproduct(req, res);
    });
export default router;