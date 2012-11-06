$(function () {

    var nhip = 4;
    var counter = 0;
    var intervalRef = null;
    var hopAmTruong = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    var hopAmTruongGiang = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    var hopAmThu = ['Am', 'A#m', 'Bm', 'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'];
    var hopAmThuGiang = ['Am', 'Bbm', 'Bm', 'Cm', 'Dbm', 'Dm', 'Ebm', 'Em', 'Fm', 'Gbm', 'Gm', 'Abm'];
    var oldHAIndex = 0;
    var viewportHeight = $(window).height();

    // set song div height
    $('#SongDiv').css('height', viewportHeight - 50);

    // Slider
    $('#slider').slider({
        min: 50,
        max: 150,
        step: 2,
        value: 90
    });

    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function () { $(this).addClass('ui-state-hover'); },
        function () { $(this).removeClass('ui-state-hover'); }
    );

    $('#RestartBtn').click(function () {
        $('#PauseBtn').click();
        $('#SongDiv').scrollTop(0);
        $('#PlayBtn').click();
    });

    $('#PlayBtn').click(function () {
        // to avoid multiple click problem we want to execute the stop function first
        $('#PauseBtn').click();
        var contentHeight = $('#SongDiv')[0].scrollHeight;
        var sliderVal = $('#slider').slider('value');
        $('#SongDiv').animate({
            scrollTop: contentHeight
        }, (275 - sliderVal) * contentHeight, 'linear', function () {
            // restart the player;
            $('#RestartBtn').click();
        });

        if (nhip > 0) {
            intervalRef = setInterval(function () {
                if (counter == 0) {
                    $('#Audio2')[0].play();
                }
                else {
                    $('#Audio1')[0].play();
                }
                counter++;
                if (counter == nhip) {
                    counter = 0;
                }
            }, 60000 / sliderVal);
        }
    });

    $('#PauseBtn').click(function () {
        $('#SongDiv').stop();
        clearInterval(intervalRef);
        intervalRef = null;
        counter = 0;
    });

    $('#TempoType').click(function () {
        if (nhip == 4) {
            $(this).attr('title', "3/4");
            nhip = 3;
        }
        else if (nhip == 3) {
            $(this).attr('title', "off");
            nhip = 0;
            clearInterval(intervalRef);
            intervalRef = null;
        }
        else {
            $(this).attr('title', "4/4");
            nhip = 4;
            $('#PlayBtn').click();
        }

    });

    $('#slider').slider({
        change: function (event, ui) {
            $('#slider').attr('title', ui.value);
            $('#PauseBtn').click();
            $('#PlayBtn').click();
        }
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
            }
        });
    });

    $('#keyNote').focus(function () {
        oldHAIndex = $(this).prop("selectedIndex");
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
        $(this).blur();
    });

    $('#SongSelector').chosen();

    BuildKeyNoteDropDown('Am');

    function BuildKeyNoteDropDown(HopAm) {
        $('#keyNote').empty();
        if (hopAmTruong.indexOf(HopAm) > -1) {
            for (i = 0; i < hopAmTruong.length; ++i) {
                $('#keyNote').append($('<option>', {
                    value: hopAmTruong[i],
                    text: hopAmTruong[i]
                }));
            }
        }
        else {
            for (i = 0; i < hopAmThu.length; ++i) {
                $('#keyNote').append($('<option>', {
                    value: hopAmThu[i],
                    text: hopAmThu[i]
                }));
            }
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
            tempHA = HopAm + "_$$$";
        }

        if (matche != null) {
            tempHA = tempHA + matche
        }

        return tempHA
    }
});
