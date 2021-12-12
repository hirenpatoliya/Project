const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, relatedlist, listCategories, listBySearch, photo, listSearch } = require('../controllers/product')
const  {requireSignin, isAuth, isFarmer} = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isFarmer, create );
router.delete('/product/:productId/:userId', requireSignin, isAuth, isFarmer, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isFarmer, update);

router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', relatedlist);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

router.param("userId",userById);
router.param("productId",productById);


module.exports = router;