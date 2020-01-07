function audioPlayer(){
    var currentSong = 0;
    try{
        //If the locally stored position doesn't exist yet, set it to currentSong, otherwise increment it by one
        if (localStorage.songPosition === "NaN"){
            localStorage.songPosition = currentSong
        }
        else{
            localStorage.songPosition++
        }
        //If the stored song position is greater than the length of the song index, reset it.
        if(localStorage.songPosition > $("#playlist li a").length-1){
                localStorage.songPosition = 0;
                currentSong = 0;
        }
        //Play the song at the locally stored position
        $("#audioPlayer")[0].src = $("#playlist li a")[localStorage.songPosition];
        $("#audioPlayer")[0].play();
        //Removes the class from the last song and adds the current-song class to the playing song to color it blue
        $("#playlist li").removeClass("current-song");
        $("#playlist li:eq("+localStorage.songPosition+")").addClass("current-song");
        //Allows you to click titles to change songs, this is mostly for an actual web page and not necessary for an automatic system.
        $("#playlist li a").click(function(e){
           e.preventDefault(); 
           //Play next song
           $("#audioPlayer")[0].src = this;
           $("#audioPlayer")[0].play();
           //Move current-song class to next song
           $("#playlist li").removeClass("current-song");
            currentSong = $(localStorage.songPosition).parent().index();
            $(this).parent().addClass("current-song");
        });
        //Check for the end of the current song, increment the current song counter and play the next one.
        $("#audioPlayer")[0].addEventListener("ended", function(){
           currentSong++;
           localStorage.songPosition = currentSong;
            if(localStorage.songPosition > $("#playlist li a").length-1){
                currentSong = 0;
                localStorage.songPosition = 0;
            }
            //Move the current-song class to the next song
            $("#playlist li").removeClass("current-song");
            $("#playlist li:eq("+currentSong+")").addClass("current-song");
            //Play next song
            $("#audioPlayer")[0].src = $("#playlist li a")[localStorage.songPosition].href;
            $("#audioPlayer")[0].play();                
        });