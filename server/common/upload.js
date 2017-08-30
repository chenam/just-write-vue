var qiniu = require('qiniu');

var accessKey = 'zGSudeC-GjYJUtPZhQOrsQEXKcIifUG8wU4etRZh';
var secretKey = 'WTukj5nW8DPt6I2OQo5xa16lsGZAn5__ZpF7fiCw';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var publicBucketDomain = 'http://ovdlbb5hr.bkt.clouddn.com';

var options = {
  scope: 'amin-blog',
  callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
  callbackBodyType: 'application/json'
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac, config);
var uploadToken=putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

module.exports = function(readableStream,key,localFile){
    /**
     * key : 上传到七牛的文件名
     */
    // formUploader.putStream(uploadToken, key, readableStream, putExtra, function(respErr,
    //     respBody, respInfo) {
    //     if (respErr) {
    //         throw respErr;
    //     }
    //     if (respInfo.statusCode == 200) {
    //         console.log(respBody);
    //     } else {
    //         console.log(respInfo.statusCode);
    //         console.log(respBody);
    //     }
    // });
    return new Promise(function(resolve,reject){
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
          respBody, respInfo) {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            let key = respBody.key;
            var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
            respBody.url = publicDownloadUrl;
            resolve(respBody);
          } else {
            reject(respInfo.statusCode,respBody)
            
          }
        });
    })
    


}