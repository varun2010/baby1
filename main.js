objects=[];
status="";
baby="";
song="";
function preload(){
    song=loadSound("Alarm-Fast-High-Pitch-A1-www.fesliyanstudios.com.mp3")
}
function setup(){
    canvas=createCanvas(640,480);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetection=ml5.objectDetector('cocossd',modelLoaded);
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,640,480);
    if(status != ""){
        objectDetection.detect(video,gotResult);
        for(var i=0; i<objects.length;i++){
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="Status:Detected Objects";
            document.getElementById("number").innerHTML="Number of Objects Detected-"+objects.length;
            percent=floor(objects[i].confidence*100);
            fill(r,g,b);
            stroke(r,g,b);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y-15);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                baby=true;
                document.getElementById("status").innerHTML="Baby Found";
            }
        }
        if(baby==""){
            song.play();
            document.getElementById("status").innerHTML="Baby Not Found";
        }
    }
}