var express = require('express');
var router = express.Router();

router.get("/:uuid",function(req,res,next){
    res.json({
        "id":`${req.params.uuid}`
    })
})

module.exports=router;