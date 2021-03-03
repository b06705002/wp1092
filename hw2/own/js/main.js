var imgList = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

var leftButElement = document.getElementById("leftButton");
var rightButElement = document.getElementById("rightButton");

leftButElement.addEventListener(
    "click",
    function() {
        var temp = document.getElementById("myImg").src;
        var url = temp;
        temp = temp.substr(temp.length - 5, temp.length);
        var index = -1;
        for (var i = 0; i < imgList.length; i++) {
            if (temp == imgList[i]) {
                index = i;
                break;
            }
        }
        if (index == 0) {
            alert("No Previous image!!!");
        } else {
            document.getElementById("myImg").src = url.substr(0, url.length - 5) + imgList[index - 1];
        }
    }
);

rightButElement.addEventListener(
    "click",
    function() {
        var temp = document.getElementById("myImg").src;
        var url = temp;
        temp = temp.substr(temp.length - 5, temp.length);
        var index = -1;
        for (var i = 0; i < imgList.length; i++) {
            if (temp == imgList[i]) {
                index = i;
                break;
            }
        }
        if (index == temp.length - 1) {
            alert("No Previous image!!!");
        } else {
            document.getElementById("myImg").src = url.substr(0, url.length - 5) + imgList[index + 1];
        }
    }
);