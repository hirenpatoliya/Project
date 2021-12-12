let pdfTemplate= require('../document/index');
let pdf = require('html-pdf');
exports.create = ((req, res, next) => {
    // console.log("create fired");
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
})