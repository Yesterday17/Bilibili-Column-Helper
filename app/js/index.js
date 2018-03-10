var md = require("markdown-it")();

onload = function () {
    //
}

$("#markdown-input").bind("input propertychange", function(){
    let text = $("#markdown-input").val();
    
    console.log(text);

    let render = md.render(text);

    console.log(render);

    $("#render-column").replaceWith('<div id="render-column">' + render + '</div>');
})