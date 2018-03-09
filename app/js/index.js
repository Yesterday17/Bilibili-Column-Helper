onload = function(){
    var jquery = require('./jquery.min.js');
    var editormd = require('./editormd.js');

    var testEditor = editormd("test-editormd", {
         width   : "90%",
        height  : 640,
        syncScrolling : "single"
    });
    console.log(testEditor);
}