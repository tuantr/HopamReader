$(function () {

    var nhip = 4;
    var counter = 0;
    var intervalRef = null;
    var hopAmTruong = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    var hopAmTruongGiang = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    var hopAmThu = ['Am', 'A#m', 'Bm', 'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'];
    var hopAmThuGiang = ['Am', 'Bbm', 'Bm', 'Cm', 'Dbm', 'Dm', 'Ebm', 'Em', 'Fm', 'Gbm', 'Gm', 'Abm'];
    var tone70 = ["SlowRock", "Slow"];
    var tone90 = ["Rumba", "Bolero", "Ballad", "Blue"];
    var tone110 = ["Tango", "Disco", "Fox", "Valse", "ChaCha"];
    var oldHAIndex = 0;
    var playDelay = 1;
    var tempoMax = 160;
    var tempoMin = 60;
    var tempoCurVal = 80;

    var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
    var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
    var isAndroid = navigator.userAgent.toLowerCase().indexOf("android");

    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();

    var displayScale = 1;
    
    /**
    * jQuery.browser.mobile (http://detectmobilebrowser.com/)
    *
    * jQuery.browser.mobile will be true if the browser is a mobile device
    *
    **/
    (function (a) { jQuery.browser.mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

    // hide pause onload
    $('#PauseBtn').hide();
    $('#TempoTypeOff').hide();

    if (jQuery.browser.mobile) {
        // mobile 
        $(window).bind('orientationchange', function () {
            viewportHeight = $(window).height();
            viewportWidth = $(window).width();

            if (isiPhone > -1 || isiPad > -1) {
                displayScale = viewportWidth / 480;
            }
            else if (isAndroid) {
                displayScale = viewportHeight / 280;
                viewportHeight = $(window).width();
                viewportWidth = $(window).height();
            }
            else {
                displayScale = viewportWidth / 320;
            }

            // set font-size for text
            displayScale = displayScale < 1 ? 1 : displayScale;
            $('#SongDiv').css('font-size', displayScale + 'em');
            $('#SongDiv').css('height', viewportHeight);
            //$('#SongDiv').css('width', viewportWidth);

            $('html, body').animate({
                scrollTop: $('#SongDiv').offset().top
            }, 1000);

            $('#PlayBtn').click();
        });

        if (isiPhone > -1 || isiPad > -1) {
            displayScale = viewportWidth / 480;
        }
        else if (isAndroid) {
            displayScale = viewportWidth / 280;
        }
    }
    else {
        // non-mobile
        displayScale = viewportWidth / 640;
    }

    // set font-size for text
    displayScale = displayScale < 1 ? 1 : displayScale;
    $('#SongDiv').css('font-size', displayScale + 'em');
    // set song div height
    $('#SongDiv').css('height', viewportHeight);
    // set initial tempo val
    SetTempoText(tempoCurVal);
        
    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function () { $(this).addClass('ui-state-hover'); },
        function () { $(this).removeClass('ui-state-hover'); }
    );

    $('#RestartBtn').click(function () {
        $('#PauseBtn').click();
        $('#SongDiv').scrollTop(0);
        playDelay = 1;
        $('#PlayBtn').click();
    });

    $('#PlayBtn').click(function () {
        // to avoid multiple click problem we want to execute the stop function first
        $('#PauseBtn').click();        

        if (playDelay > 0) {

            $('html, body').animate({
                scrollTop: $('#SongDiv').offset().top
            }, 1000);

            var sec = 3;
            $('#spanCounter').fadeIn('slow');
            var timer = setInterval(function () {
                $('#spanCounter').text(sec--);
                if (sec == -1) {
                    $('#spanCounter').fadeOut('slow');
                    clearInterval(timer);
                }
            }, 1000);
            $('#SongDiv').delay(sec * 2000);
            playDelay = 0;
        }

        var contentHeight = $('#SongDiv')[0].scrollHeight;
        var animateSpeed = 1;
        if (jQuery.browser.mobile) {
            animateSpeed = ((280 - tempoCurVal) * contentHeight) / (displayScale)
        }
        else {
            animateSpeed = ((450 - tempoCurVal) * contentHeight) / (displayScale)
        }

        $('#SongDiv').animate({
            scrollTop: contentHeight
        }, animateSpeed, 'linear', function () {
            // restart the player;
            $('#RestartBtn').click();
        });

        // only turn on tempo before off is click 
        if (nhip > 0) {
            $('#TempoTypeOn').click();
        }

        $(this).hide();
        $('#PauseBtn').show();
    });

    $('#PauseBtn').click(function () {
        $('#SongDiv').stop();
        var temp = nhip;
        $('#TempoTypeOff').click();
        nhip = temp; // reset nhip
        $(this).hide();
        $('#PlayBtn').show();
    });

    $('#TempoTypeOff').click(function () {
        nhip = 0;
        clearInterval(intervalRef);
        intervalRef = null;
        $(this).hide();
        $('#TempoTypeOn').show();
    });

    $('#TempoTypeOn').click(function () {
        clearInterval(intervalRef);
        intervalRef = null;
        intervalRef = setInterval(function () {
            if ($.browser.msie) {
                $('#Audio1')[0].play();
            }
            else {
                $('#Audio2')[0].play();
            }
        }, (60 / tempoCurVal) * 1000);
        $(this).hide();
        $('#TempoTypeOff').show();
    });

    $('#TempoMinus').click(function () {
        if (tempoCurVal > tempoMin) {
            tempoCurVal -= 5;
            SetTempoText(tempoCurVal);
            $('#PlayBtn').click();
        }
    });

    $('#TempoPlus').click(function () {
        if (tempoCurVal < tempoMax) {
            tempoCurVal += 5;
            SetTempoText(tempoCurVal);
            $('#PlayBtn').click();
        }
    });

    songServer.getAllSongs().done(function (songs) {
        for (i = 0; i < songs.length; ++i) {
            $('#SongSelector').append($('<option>', {
                value: songs[i].ID,
                text: songs[i].Title
            }));
        }
        $('#SongSelector').chosen();
    });

    $('#SongSelector').change(function () {
        var id = $(this).val();
        songServer.getSong(id).done(function (song) {
            if (song != null) {
                var tempText = song.Body.replace(/\n\r?/g, '<br />').replace(/\(/g, '<span class="HAClass">').replace(/\)/g, '</span>').replace(/\[/g, '<span class="HAClass">').replace(/\]/g, '</span>');
                $('#SongTxt').html(tempText);
                $('#PauseBtn').click();
                $('#SongDiv').scrollTop(0);
                var hopAmChu = $('#SongTxt span:first').text();
                BuildKeyNoteDropDown(hopAmChu);
                // set current tempo val
                tempoCurVal = FindTone(song.Tone);
                SetTempoText(tempoCurVal);
                // set song info
                var info = song.Writer != null ? song.Writer : '';
                info += ' - ';
                info += song.Tone != null ? song.Tone : '';
                $('#SongInfo').text(info);
            }
        });
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 1500);
        // turn on play delay for new song
        playDelay = 1;
    });

    $('#keyNote').change(function () {
        var newHAIndex = $(this).prop("selectedIndex");
        var keyToInc = newHAIndex - oldHAIndex;
        if (keyToInc < 0) {
            keyToInc = keyToInc + 12;
        }
        $('#SongTxt span').each(function () {
            var tempHA = $(this).text();
            $(this).text(ConvertHopAm(tempHA, keyToInc));
        });
        oldHAIndex = newHAIndex;
    });   

    BuildKeyNoteDropDown('Am');

    function SetTempoText(tempoVal) {
        // set tempoVal
        $('#TempoVal').text(tempoVal);
    }

    function BuildKeyNoteDropDown(HopAm) {
        $('#keyNote').empty();
        if (hopAmTruong.indexOf(HopAm) > -1) {
            for (i = 0; i < hopAmTruong.length; ++i) {
                $('#keyNote').append($('<option>', {
                    value: hopAmTruong[i],
                    text: hopAmTruong[i]
                }));
            }
            oldHAIndex = hopAmTruong.indexOf(HopAm);
        }
        else {
            for (i = 0; i < hopAmThu.length; ++i) {
                $('#keyNote').append($('<option>', {
                    value: hopAmThu[i],
                    text: hopAmThu[i]
                }));
            }
            oldHAIndex = hopAmThu.indexOf(HopAm);
        }
        $('#keyNote').val(HopAm);
    }

    // Doi hop am
    function ConvertHopAm(HopAm, DoTang) {
        var pattern = /[0-9]+/;
        var matche = HopAm.match(pattern);
        // remove number from HopAm
        var tempHA = HopAm.replace(pattern, "");
        // chuyen Giang qua Thang
        tempHA = hopAmThuGiang.indexOf(tempHA) > -1 ? hopAmThu[hopAmThuGiang.indexOf(tempHA)] : hopAmTruongGiang.indexOf(tempHA) > -1 ? hopAmTruong[hopAmTruongGiang.indexOf(tempHA)] : tempHA;

        if (hopAmTruong.indexOf(tempHA) > -1) {
            var indextempHA = hopAmTruong.indexOf(tempHA) + DoTang;
            if (indextempHA > 11) {
                indextempHA = indextempHA - 12;
            }
            tempHA = hopAmTruong[indextempHA];
        }
        else if (hopAmThu.indexOf(tempHA) > -1) {
            var indextempHA = hopAmThu.indexOf(tempHA) + DoTang;
            if (indextempHA > 11) {
                indextempHA = indextempHA - 12;
            }
            tempHA = hopAmThu[indextempHA];
        }
        else {
            tempHA = HopAm + "$";
        }

        if (matche != null) {
            tempHA = tempHA + matche
        }

        return tempHA
    }

    // tim tone nhac
    function FindTone(tone) {
        if (tone70.indexOf(tone) > -1) {
            return 70;
        }
        else if (tone90.indexOf(tone) > -1) {
            return 90;
        }
        else if (tone110.indexOf(tone) > -1) {
            return 110;
        }
        else {
            return 100;
        }
    }
});
