var multer = require('multer');

var storage = multer.diskStorage({
    // 保存到本地磁盘
    // destination : function(req,file,cb){
    //     cb(null,'./public/images/');
    // },
    filename : function(req,file,cb){
        
        var fileFormat = (file.originalname).split(',');
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
}); 

var upload = multer({
    storage : storage
});

module.exports = upload;