    var prediction1= "";
    var prediction2= "";

    Webcam.set ( {
        width:370,
        height: 370,
        image_format: "png",
        png_quality: 90
    })

    camera= document.getElementById("camera");
    
    Webcam.attach("#camera");

    function take_snapshot() 
    {
        Webcam.snap(function(data_uri) {
            document.getElementById("result_img").innerHTML= "<img id='captured_img' src='"+ data_uri+ "'>";
        });
    }

    console.log('ml5 version:', ml5.version);

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yZhPDv7p1/model.json',modelLoaded);

    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = "the first prediction is" + prediction1 + "the second prediction is" + prediction2;
        var utterthis = new SpeechSynthesisUtterance(speak_data_1);
        synth.speak(utterthis);
    }

    function modelLoaded() {
        console.log("model Loaded!");
    }

    function predict() {
        img= document.getElementById("captured_img");
        classifier.classify(img, gotresults);
    }

    function gotresults(error, results) {
        if (error) {
            console.error(error);
        }
        else {
            console.log(results);
            document.getElementById("result_1").innerHTML= results[0].label;
            document.getElementById("result_2").innerHTML= results[1].label;
            prediction1 = results[0].label;
            prediction2 = results[1].label;
            speak();
        }
    }