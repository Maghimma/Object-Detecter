img = "";
status = "";
objects = [];

function back() {
    window.location = "index.html";
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(400, 250);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload() {
    img = loadImage('dog.jpg');
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#000000");
            textFont('Patrick Hand');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("#9FD4CB");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}