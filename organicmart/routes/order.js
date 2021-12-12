const express = require('express');
const router = express.Router();

const  {requireSignin, isAuth, isFarmer} = require('../controllers/auth');
const {userById, addOrderToUserHistory} = require('../controllers/user');
const { create, listOrders, getStatusValues, orderById, updateOrderStatus} = require('../controllers/order');
const {decreaseQuantity} = require('../controllers/product');

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create)

router.get('/order/list',listOrders);
router.get('/order/status-values/:userId', requireSignin, isAuth, isFarmer, getStatusValues);
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isFarmer, updateOrderStatus);

router.param('userId',userById);
router.param('orderId', orderById);

module.exports = router