status = "";
objects=[];


function preload(){
img = loadImage('gedz.jpeg');
}


function draw(){
image(video, 0, 0, 380, 380);
if(status != ""){
    imageDetector.detect(video, gotResult)
    for(i=0; i < objects.length; i++){
        percent=floor(objects[i].confidence*100);
        r= random(255);
        g= random(255);
        b= random(255);
        fill(r,g,b);
        text(objects[i].label+ " " + percent + "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        document.getElementById("status").innerHTML="status: Objects Detected";
        document.getElementById("n_o").innerHTML= "Number of objects detected: "+ objects.length;
        
    }
}
}

function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video= createCapture(VIDEO);
video.hide();
imageDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Object!";
}

function modelLoaded(){
console.log("Model Is Loaded");
status=true;
imageDetector.detect(video, gotResult);
}

function gotResult(error, results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects=results;
}
}