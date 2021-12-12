const express = require('express');
const router = express.Router();

const  {requireSignin, isAuth, isFarmer} = require('../controllers/auth');
const {userById, read, update, purchaseHistory, listalluser,deleteuser} = require('../controllers/user');


router.get("/secret/:userId", requireSignin, isAuth, isFarmer, (req,res) => {
    res.json({user: req.profile});
})

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update)
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.get("/users", listalluser);
router.delete("/users/:userId", deleteuser);

router.param("userId",userById);

module.exports = router;