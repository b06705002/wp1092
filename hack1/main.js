// TODO:
const foc = document.querySelector('input[type="text"]');
const cancel = document.getElementById("cancel-button");
const comment = document.getElementById("comment-button");
var v = "";
var count = 1;

foc.addEventListener('focus',
    function() {
        document.getElementById("comment-button-group").style = "";
        document.getElementById("comment-input").value = v;
    }
);

function myFunction() {
    if (document.getElementById("comment-input").value != "") {
        document.getElementById("comment-button").style = "background-color: #065fd4; color: #ffffff;";
    } else {
        document.getElementById("comment-button").style = "disabled: true; background-color: #cccccc; color: #ffffff;";
    }
}


cancel.addEventListener(
    "click",
    function() {
        document.getElementById("comment-button-group").style = "display: none";
        v = document.getElementById("comment-input").value;
        document.getElementById("comment-input").value = "";
    }
);

String.prototype.trim = function() {
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}

comment.addEventListener(
    "click",
    function() {
        var n = document.getElementById("comment-input").value;
        document.getElementById("comment-input").value = "";
        v = "";
        n = n.trim();
        var content = document.getElementById("comment-group").innerHTML;
        var newContent = "<div class='comment'><img class='comment-img' src='images/user-icon.jpg' /><div class='comment-right'><div><span class='comment-name'>Toby Chen</span><span class='comment-time'>現在</span></div><p class='comment-text'>" + n + "</p></div></div>";
        document.getElementById("comment-group").innerHTML = content + newContent;
        document.getElementById("comment-button").style = "disabled: true; background-color: #cccccc; color: #ffffff;";
        count = count + 1;
        document.getElementById("comment-num").textContent = count.toString() + "則留言";
    }
);