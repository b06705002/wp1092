const photo_list = 
["https://i1.kknews.cc/SIG=3au2t2a/5r7n0001ps1pr84p7o46.jpg", 
    "https://i1.kknews.cc/SIG=3m0euk/66nr00026ss0s83q4qn8.jpg", 
    "https://images.chinatimes.com/newsphoto/2020-10-28/1024/20201028004982.jpg"];

var index = 0;
var photo = document.getElementById("display");
var back_button = document.getElementById("previous");
var next_button = document.getElementById("next");
var source = document.getElementById("source_url")
// var next_picture = function () { index += 1; }
// var previous_picture = function () { index += 1; }
var image = new Image();
image.onload = function () {
    photo.src = photo_list[index];
    source.textContent = photo_list[index];
    source.href = photo_list[index];
    // photo = 
}
image.src = photo_list[index];
// photo.src = photo_list[index];
back_button.addEventListener("click", () => {
        if (index > 0) {
            index -= 1;
            photo.src = "./images/loading.gif";
            var image = new Image();
            image.onload = function () {
                photo.src = photo_list[index];
                source.textContent = photo_list[index];
                source.href = photo_list[index];
                // photo = 
            }
            image.src = photo_list[index];
            if (index == 0) {
                back_button.classList.add("disabled");
            }
            if (index == 1) {
                next_button.classList.remove("disabled");
            }
        }
    }
)
next_button.addEventListener("click", () => {
        if (index < 2) {
            index += 1;
            photo.src = "./images/loading.gif";
            var image = new Image();
            image.onload = function () {
                photo.src = photo_list[index];
                source.textContent = photo_list[index];
                source.href = photo_list[index];
                // photo = 
            }
            image.src = photo_list[index];
            if (index == 2) {
                next_button.classList.add("disabled");
            }
            if (index == 1) {
                back_button.classList.remove("disabled");
            }
        }
    }
)

