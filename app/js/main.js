
     // 2. This code loads the IFrame Player API code asynchronously.
     let tag = document.createElement('script');

     tag.src = "https://www.youtube.com/iframe_api";
     let firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

     // 3. This function creates an <iframe> (and YouTube player)
     //    after the API code downloads.
     let player;
     function onYouTubeIframeAPIReady() {
       player = new YT.Player('player', {
         height: '100%',
         width: '100%',
         videoId: 'OXuIqaeg0SI',
         events: {
           'onReady': onPlayerReady,
           'onStateChange': onPlayerStateChange
         }
       });
     }
 
     // 4. The API will call this function when the video player is ready.
     function onPlayerReady(event) {
       event.target.playVideo();
     }

     // 5. The API calls this function when the player's state changes.
     //    The function indicates that when playing a video (state=1),
     //    the player should play for six seconds and then stop.
     let done = false;
     function onPlayerStateChange(event) {
       if (event.data == YT.PlayerState.PLAYING && !done) {
         setTimeout(stopVideo, 6000);
         done = true;
       }
     }
     function stopVideo() {
       player.stopVideo();
     }




     $(function () {   //Menu

           $('.header-nav-li').each(function (index, element) {
            $(element).click(function () {
                let id = $(this).attr('mhref');
                let top = $(id).offset().top;
                $('.header-nav-li').removeClass('active');
                $('.header-nav-li').eq(index).addClass('active');
                $('html').animate({
                    scrollTop: top
                }, 1500)
            })
        })
        
        //scroll
        $(window).scroll(function () {
            $('.header-nav-li').each(function (index, element) {
                let id = $(this).attr('mhref');
                let top = $(id).offset().top;
                if (window.scrollY + 200 > top) {
                    $('.header-nav-li').removeClass('active');
                    $('.header-nav-li').eq(index).addClass('active');
                };
            })
        })
      })