const express = require('express');
const router = express.Router();

const  { create, categoryById, read, update, remove, list } = require('../controllers/category');
const  {requireSignin, isAuth, isFarmer} = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.get("/category/:categoryId", read)
router.post("/category/create/:userId", requireSignin, isAuth, isFarmer, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isFarmer, update);
router.delete("/category/:categoryId/:userId", requireSignin,isAuth, isFarmer, remove);
router.get("/categories", list);

router.param("categoryId",categoryById)
router.param("userId",userById);

module.exports = router;