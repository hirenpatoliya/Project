const router =require('express').Router();
const {create} = require("../controllers/report");

router.post("/pdf/create",create);
router.get('/fetch-pdf', (req, res) => {
    console.log("fired:",__dirname);
    res.sendFile(`D:/Project/organicmart/result.pdf`);
})

module.exports = router;