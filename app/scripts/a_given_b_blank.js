var wrong=[];
var count;
;$(document).ready(function () {
    initial();
    addEvents();
    texture($('.next'), $('.myprogress'));
});
function initial() {
    $('.part').eq(0).addClass('active');
    $('.part:gt(0)').hide();
    for(var i=0;i<$('.part').length;i++){
        wrong.push(1);
    }
    count = 0;
};
function addEvents() {
    $('.horn').click(function () {
        if ($(this).hasClass('press')) {
            $(this).removeClass('press');
            $(this).attr('src', '../imgs/icon_sound.png');
        }
        else {
            $(this).addClass('press');
            $(this).attr('src', '../imgs/icon_sound_press.png');
        }
    });
    $('.next').click(function () {
        $('.part').removeClass('active');
        $(this).parent().addClass('active');
        if ($('.active').find('input[type=text]').val().length == 0) {
            //$('.active').find('.inputTip').css('display', 'block');
            $('.active').find('.inputTip').fadeIn('slow');
            setTimeout(function() {
                $('.active').find('.inputTip').fadeOut('slow');
            }, 1500);

        }
        else if (count == wrong.length) {
            console.log("complete");
            sendAnswerAjax();
        }
        else {
            if ($(this).text() == 'Answer') {
                showAnwser();
                judge($('.active').find('input[type=text]').val());
                $(this).text('Next');
            }
            else {
                showNextQuestion();
                $(this).text('Answer');
            }
        }
    });
};

function judge(youranswer) {
    if ($('.active').find('.answers .a1').text() !== youranswer && $('.active').find('.answers .a2').text() !== youranswer && $('.active').find('.answers .a3').text() !== youranswer) {
        wrong[parseInt($('.active .num').text())-1]=1;
    }
    else {
        //console.log("correct");
        wrong[parseInt($('.active .num').text())-1]--;
        console.log($('.active .num').text());
        console.log("题目:"+(parseInt($('.active .num').text())-1)+"剩余:"+wrong[parseInt($('.active .num').text())-1]);
        if(wrong[parseInt($('.active .num').text())-1]==0){
            count++;
            console.log(count);
        }
    }
}

function sendAnswerAjax() {
    $.ajax({
            url: 'nextType',
            type: 'post',
            data: getAnswers(),
        })
        .done(function (url) {
            window.location.href = url;
        })
        .fail(function () {
            alert('刷新失败，请重试！');
        })
}
function getAnswers() {
    var data = {};
    // 当前所学习的语言、tour、unit、题目类型
    // 比如http://localhost:3000/A_GIVEN_B_CLOZE%EF%BC%9Flanguage=en&tour=1&unit=2
    data.type = window.location.pathname.substr(1);
    var search = window.location.search.substr(1).split(/[\=\&]/g);
    data.language = search[1];
    data.tour = search[3];
    data.unit = search[5];
    // 每道题的答案信息，题目id、答案
    data.answers = [];
    for (var i = 0; i < $('.part').length; i++) {
        var temp = {};
        temp._id = $('.part').eq(i).find('.num').attr('table_id');
        temp.answer = $('.part').eq(i).find('input').val();
        data.answers.push(temp);
    }
    return data;
}
function showAnwser() {
    $('.active').find('.answers').show();
    if ($('.part:last').hasClass('active')) {
        $('.next').addClass('last');
    }
}
function showNextQuestion() {
    var ob = $('.active');
    ob.find('input[type=text]').val("");
    ob.find('.answers').hide();
    var num = parseInt($('.active .num').text())-1;
    ob.hide();
    //ob.next().show();
    for(var i=(num+1)%(wrong.length);wrong[i]==0;i=(i+1)%(wrong.length));
    //console.log(i);
    $('.part').eq(i).show();
    if(wrong[num]==0)
        $('.learn0').eq(num).addClass('learn1');
    ob.removeClass('active');
    $('.part').eq(i).addClass('active');
};
// button的背景纹理和coins的纹理
function texture(btns, coins) {
    var image = 'url(../imgs/texture/Metal_texture_0' + myramdom(1, 6) + '.jpg)'
    btns.css({
        'background-image': image,
        'color': 'black',
        'font-weight': 'bold'
    });
    //coins.find('.learn0').eq(0).addClass('learn1');
}
function myramdom(min, max) {
    return min + Math.round(Math.random() * (max - min));
}
