const {clipboard} = require('electron')
var oldCB = ""

const notifier = require('node-notifier');

const path = require("path")
function tombkbgb(size) {
    if (size > 1000000000) {
        return Math.floor(size / 1000000000) + "GB"
    } else if (size > 1000000) {
        return Math.floor(size / 1000000) + "MB"
    } else if (size > 1000) {
        return Math.floor(size / 1000) + "KB"
    } else {
        return size + "B"
    }

}
setInterval(function() {
    var cbNI = clipboard.readImage()
    var cbI = cbNI.toDataURL()
    if (cbI== oldCB) {} else{
        if (cbI == "data:image/png;base64,") { 
            
        } else if (cbI.startsWith("data:image/png;base64,")) { 
            console.log(" IMAGE")
            var querystring = require('querystring');
            var request = require('request');

            var form = {
                base64: cbI,
                type: ".png"
            };

            var formData = querystring.stringify(form);
            var contentLength = formData.length;
            notifier.notify({
                title: 'Uploading',
                message: "The image is being uploaded. Please hold on.\nFile is " + tombkbgb(formData.length) + " (eta: " + Math.floor(formData.length / 400000)  + "s)",
                icon: path.join(__dirname, 'upload.png'),
                timeout: 1,
              });
              var start = (new Date()) 
            request({
                headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: 'http://lmgn.uk/u.php',
                body: formData,
                method: 'POST'
            }, function (err, res, body) {
                if (err) {
                    clipboard.writeText(err)
                    notifier.notify({
                        title: 'Upload failed',
                        message: "The details have been copied to your clipboard.",
                        icon: path.join(__dirname, 'upload.png'),
                        sound: "Sosumi"
                      });
                } else {
                    clipboard.writeText(body.replace("/home/dh_3xwieq/","https://"))
                    if (body.includes("/home/dh_3xwieq/")) {
                        var time = (new Date()) - start;
                        notifier.notify({
                            title: 'Uploaded to server!',
                            message: 'URL: ' + body.replace("/home/dh_3xwieq/","https://") + "\nAvgSpeed: " +tombkbgb(Math.floor(formData.length / (time/1000))) + "/s, took: " + Math.floor( time /1000) + "s",
                            icon: path.join(__dirname, 'upload.png'),
                            open: body.replace("/home/dh_3xwieq/","https://"),
                            sound: "Hero",
                        });
                    } else {
                        notifier.notify({
                            title: 'The server had an error',
                            message: "The details have been copied to your clipboard.",
                            icon: path.join(__dirname, 'upload.png'),
                            sound: "Sosumi"
                        });
                    }

                }
            });
        }
        oldCB = cbI
    }
},100)