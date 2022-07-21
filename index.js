const progressTag = document.querySelector('.scroll_progress');
const bodyTag = document.querySelector('body');

const introPage = document.querySelector('#intro');
const aboutPage = document.querySelector('#about');
const skillsPage = document.querySelector('#skills');
const workPage = document.querySelector('#work');

const introOffH = introPage.offsetTop;
const aboutOffH = aboutPage.offsetTop;
const skillsOffH = skillsPage.offsetTop;
const workOffH = workPage.offsetTop;

const itsMe = document.querySelector('.its_me');
const myPhoto = document.querySelector('.my_photo');

const fadeInCont = document.querySelectorAll('.com_fadein');


//it's me 네비게이션
document.querySelectorAll('a[href^="#"]').forEach(nav => {
    nav.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('scroll', () => {
    const pageHeight = bodyTag.getBoundingClientRect().height;
    const pixels = window.pageYOffset;
    const totalHeight = pageHeight - window.innerHeight;
    const percentage = pixels / totalHeight;

//스크롤 퍼센테이지
    progressTag.style.width = `${100 * percentage}%`;

//백그라운드 컬러 애니메이션
    if(introOffH >= pixels){
        bodyTag.style.backgroundColor = "#f7f2ed";
        bodyTag.style.transition = ".4s";
    }else{
        bodyTag.style.backgroundColor = "rgba(247, 242, 237, .35)";
    }

//it's me 스크롤 조정
    if(introOffH + 50 >= pixels){
        itsMe.classList.remove("in_about");
    }else{
        itsMe.classList.add("in_about");
    }

//it's me 스톱
    pixels >= skillsOffH ? itsMe.classList.add("stop") : itsMe.classList.remove("stop");

//콘텐츠 fadeIn
fadeInCont.forEach(function(el){
    if(this.scrollY > el.offsetTop/1.5){
        el.classList.add('OP1');
    }
});

//skill에리어 프로그래스바
    const hereStart = pageHeight - skillsOffH;
    if(pixels >= hereStart){
        document.getElementById('html_bar').value = '80';
        document.getElementById('css_bar').value = '75';
        document.getElementById('js_bar').value = '60';
        document.getElementById('ps_bar').value = '70';
    }
})

//경력 탭
$('ul.history_list li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.history_list li.now_click').removeClass('now_click');
    $('ul.history_list li').addClass('no_click');
    $('.com_page').removeClass('openPage');

    $(this).removeClass('no_click');
    $(this).addClass('now_click');
    $("#"+tab_id).addClass('openPage');
})

//포폴 팝업

$(".work_list li").on("click", function(event) {
    setTimeout(function() {
        $("#PF_popup").show(250);
        $("body").append('<div class="backon"></div>');

        function scrollDisable(){
            $('body, html').addClass('hidden').on('scroll touchmove mousewheel', function(e){
                e.preventDefault();
            });
        }
        scrollDisable();
    },200);
});

$("body").on("click", function(event) {
    if(event.target.className == 'closeBtn' || event.target.className == 'backon'){
        $("#PF_popup").hide(250);
        $(".backon").remove();

        function scrollAble(){
            $('body, html').removeClass('hidden').off('scroll touchmove mousewheel');
        }
        scrollAble();
    }
});


//work 리스트 클론 및 가로스크롤
var workList = document.querySelector('.work_list');
var workListItem = document.querySelectorAll('.work_list li');
var move = 0;
var listCount = workListItem.length,
    listWid = 300,
    listMargin = 40;


$('.work_list').hover(function(){
    bodyTag.style.overflow = "hidden";
    document.addEventListener('scroll mousewheel',function(e){
        e.preventDefault();
})
},function(){
    bodyTag.style.overflow = "auto";
    document.addEventListener('scroll mousewheel',function(e){
        e.preventDefault();
})
});

makeClone();
function makeClone(){
    for(var i=0; i<listCount; i++){
        var cloneList = workListItem[i].cloneNode(true);
        cloneList.classList.add('clone');
        workList.appendChild(cloneList);
    }
    for(var i = listCount -1; i >=0; i-- ){
        var cloneList = workListItem[i].cloneNode(true);
        cloneList.classList.add('clone');
        workList.prepend(cloneList);
    }
    updateWid(); //클론한 넓이값
    setInitialPos(); //중간으로 이동
    setTimeout(function(){
        workList.classList.add('moveAni');
    }, 100);
}
function updateWid(){
    var currentList = document.querySelectorAll('.work_list li');
    var newListCount = currentList.length;

    var newWid = (listWid + listMargin) * newListCount - listMargin + 'px';
    workList.style.width = newWid;
}
function setInitialPos(){
    var initialTranslateValue = -(listWid + listMargin) * listCount;
    workList.style.transform = 'translate('+initialTranslateValue+'px,45%)';
}

workList.addEventListener('mousewheel',function(e){
        if(e.wheelDelta > 0){
            //up
            try{move = el.previousElementSibling.offsetLeft;
            }
            catch{
                moveSlide(move - 1);
            }
        }else{
            //down
            try{move = el.nextElementSibling.offsetLeft;
            }
            catch{
                moveSlide(move + 1);
            }
            finally{}
        }
    });

//버튼일경우
// nextBtn.addEventListener('click',function(){
//     moveSlide(move + 1);
// })
// prevBtn.addEventListener('click',function(){
//     moveSlide(move - 1);
// })
function moveSlide(num){
    workList.style.left = -num * (listWid + listMargin) + 'px';
    move = num;

    if(move == listCount || move == -listCount){
        setTimeout(function(){
            workList.classList.remove('moveAni');
            workList.style.left = '0px';
            move = 0;
        }, 500);
        setTimeout(function(){
            workList.classList.add('moveAni');
        }, 600);
    }
}
