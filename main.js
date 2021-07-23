song1="";
song2="";
song1_status="";
song2_status="";
scoreleftwrist=0;
scorerightwrist=0;
rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;

function preload(){
 song1=loadSound("The_Chainsmokers_Closer.mp3");
 song2=loadSound("Jastin biber.mp3");   
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Model is on");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy= results[0].pose.leftWrist.y;
        console.log(leftwristx,leftwristy);
        rightwristx= results[0].pose.rightWrist.x;
        rightwristy= results[0].pose.rightWrist.y;
        console.log(rightwristx,rightwristy);
       scoreleftwrist=results[0].pose.keypoints[9].score;
       scorerightwrist=results[0].pose.keypoints[10].score; 
    }   
   }

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("#FF0000");
        stroke("#0000FF");
        
            
            if(scorerightwrist > 0.2){
                circle(rightwristx,rightwristy,20);
                song2.stop();

                if(song1_status == false){
                     song1.play();
                     
                }

            }
    
             
            
            if(scoreleftwrist > 0.2){
                circle(leftwristx,leftwristy,20);
                song1.stop();

                if(song2_status == false){
                     song2.play();
                     
                }
            }
    
        }       

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


