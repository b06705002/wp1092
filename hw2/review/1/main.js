i = 0;
picture_arr = ["https://imgur.com/62MZk90.jpg","https://imgur.com/KVFz5TZ.jpg","https://imgur.com/n6Hu5AZ.jpg","https://imgur.com/gdrQU74.jpg"
,"https://i.imgur.com/F7TGOJ7.jpg","https://i.imgur.com/DuXnYWE.jpg","https://i.imgur.com/Rxn2Ql4.png","https://i.imgur.com/0vjOhmS.jpg","https://i.imgur.com/LjgfZRw.jpg"];
var g = function fun(y) {
    i = i + y;
    console.log(i);
    if(i < 0){
        i = i + 1;
    }
    else if(i >= picture_arr.length){
        i = i - 1;
    }
    else{
        document.getElementById("display").src = picture_arr[i];
    }
    if(i == 0){
        document.getElementById("prev_btn").className = "disabled";
    }
    else if(i == (picture_arr.length-1)){
        document.getElementById("next_btn").className = "disabled";
    }
    else{
        document.getElementById("prev_btn").className = "image-viewer__button";
        document.getElementById("next_btn").className = "image-viewer__button";
    }
}
var h = function gear() {
    document.getElementById("display").src = "https://i.imgur.com/8pRVc2U.gif";
}
var k = function fly() {
    if(i<picture_arr.length-1){
        h();
        setTimeout(function(){g(1)},1000);
    }
}
var l = function fly() {
    if(i>0 ){
        h();
        setTimeout(function(){g(-1)},1000);
    }
}

k();

document.getElementById("next").addEventListener("click",function(){k()},false);
document.getElementById("previous").addEventListener("click",function(){l()},false);


