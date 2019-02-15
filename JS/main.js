// Global Variables

const width = 500,
      height = 0,
      filter ="none",
      streaming = false;

// DOM Elements

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");

//Get media Stream

navigator.mediaDevices.getUserMedia({video:true, audio: false})
.then((stream) => {
 //link to the video source
 video.srcObject = stream;
 //play video
    video.play();
})
.catch((err) => {
    console.log("Error",err)
});

//  Play when ready

video.addEventListener("canplay", function (e) {

    if(!streaming){
        //set video / canvas height
        let height = video.videoHeight / (video.videoWidth/ width);
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);

       let streaming = true;
    }
}, false);

photoButton.addEventListener("click", function (e) {
    takePicture();

    e.preventDefault();
}, false);

function takePicture() {
    //Create Canvas
    const context = canvas.getContext("2d");
    if(width && height){
        // set canvas props
        canvas.height = height;
        canvas.width = width;
        // Draw an image of the video on the canvas
        context.drawImage(video,0,0, width,height)
    }
}