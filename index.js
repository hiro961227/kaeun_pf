const progressTag = document.querySelector('.scroll_progress');
const bodyTag = document.querySelector('body');

const introPage = document.querySelector('#intro');
const aboutPage = document.querySelector('#about');
const skillsPage = document.querySelector('#skills');
const workPage = document.querySelector('#work');
const itsMe = document.querySelector('.its_me');
const myPhoto = document.querySelector('.my_photo');
const introPageH = introPage.getBoundingClientRect().height;
const aboutPageH = aboutPage.getBoundingClientRect().height;
const skillsPageH = skillsPage.getBoundingClientRect().height;
const workPageeH = workPage.getBoundingClientRect().height;

const aboutMain = document.querySelector('.about_cont');
const skillsMain = document.querySelector('.skills_cont');
const workMain = document.querySelector('.work_cont');

document.addEventListener('scroll', () => {
    const pageHeight = bodyTag.getBoundingClientRect().height;
    const pixels = window.pageYOffset;
    const totalHeight = pageHeight - window.innerHeight;
    const percentage = pixels / totalHeight;
    const stophere = pageHeight - skillsPageH * 1.9;

//스크롤 퍼센테이지
    progressTag.style.width = `${100 * percentage}%`;

//백그라운드 컬러 애니메이션
    if(introPageH - 630 >= pixels){
        bodyTag.style.backgroundColor = "#f7f2ed";
        bodyTag.style.transition = ".4s";
    }else{
        bodyTag.style.backgroundColor = "rgba(247, 242, 237, .35)";
    }

//it's me 스크롤 조정
    if(introPageH - 650 >= pixels){
        itsMe.classList.remove("in_about");
        itsMe.style.animation = 'pageCg .8s ease-in-out forwards';
        myPhoto.style.animation = 'circleSize .8s ease-in-out forwards';
    }else{
        itsMe.classList.add("in_about");
        itsMe.style.animation = 'pageCg .8s ease-in-out reverse forwards';
        myPhoto.style.animation = 'circleSize .8s ease-in-out reverse forwards';
    }

//it's me 스톱
    pixels >= stophere ? itsMe.classList.add("stop") : itsMe.classList.remove("stop");

//section 스크롤 할때마다 떠오르게

//skill에리어 프로그래스바
    const hereStart = pageHeight - skillsPageH * 2.45;
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