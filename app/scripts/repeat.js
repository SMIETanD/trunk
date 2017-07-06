function getValue()
{
    //document.getElementById("a").innerHTML="2"
    artyom.fatality();// use this to stop any of

    artyom.addCommands({
        indexes:["Hello","Hey","Hurra"],
        action: function(i){
            // i = index of the recognized option
            console.log("Something matches");
        }
    });


    //Wait 2 seconds before start artyom again
    setTimeout(function(){
        artyom.initialize({
            executionKeyword:"and do it now",
            debug:true,
            continuous:true,
            lang:"en-US",
            listen:true
        });
    },500);
}

if(artyom.recognizingSupported()){
    artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
        if(isFinal){
            document.getElementById("a").innerHTML="please wait"
            console.log(""+recognized)
            getScoreAjax(""+recognized);
            artyom.fatality();
        }else{
            //document.getElementById("a").innerHTML=""+recognized
            console.log(""+recognized)
        }
    });
}


function getScoreAjax(source,result){
    $.ajax({
            url: 'repeat',
            type: 'post',
            data: {word1:source,word2:result},
        })
        .done(function(score){
            console.log(score);
            document.getElementById("a").innerHTML="Your grade is:"+score.score;
        })
        .fail(function() {
            alert('Date transfer failed!');
        })
}