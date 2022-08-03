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

let mobileStopBanner = skillsPage.clientHeight + skillsOffH

const fadeInCont = document.querySelectorAll('.com_fadein');
var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));


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
    if(matchMedia("all and (min-width:768px)")){
        pixels >= skillsOffH ? itsMe.classList.add("stop") : itsMe.classList.remove("stop");
    }else if (matchMedia("all and (max-width:767px)")){
        pixels >= mobileStopBanner ? itsMe.classList.add("stop") : itsMe.classList.remove("stop");
    }

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

//work 리스트 불러오기
$.ajax({
    url: 'work.json',
    type: 'GET',
    success: function (data) {
        var contentsData = data.work;

        for(var i = 0; i< contentsData.length; i++){
            workListArea = '';
            modalArea = '';

            if( contentsData[i] ){
                var no = contentsData[i].no;
                var title = contentsData[i].title;
                var imgSrc = contentsData[i].imgSrc;
                var imgSrc2 = contentsData[i].imgSrc2;
                var imgSrc3 = contentsData[i].imgSrc3;
                var eventEnd = contentsData[i].eventEnd;
                var urlNotice = contentsData[i].urlNotice;
                var siteUrl = contentsData[i].siteUrl;
                var siteUrl2 = contentsData[i].siteUrl2;
                var siteUrl3 = contentsData[i].siteUrl3;
                var siteUrl4 = contentsData[i].siteUrl4;
                var mainTxt = contentsData[i].mainTxt;
                var mediaCheck = contentsData[i].mediaCheck;
                var makeDate = contentsData[i].makeDate;
                var participation = contentsData[i].participation;
                var participationTxt01 = contentsData[i].participationTxt01;
                var participationTxt02 = contentsData[i].participationTxt02;
                var participationTxt03 = contentsData[i].participationTxt03;
                var codeImgSrc = contentsData[i].codeImgSrc;
                var codeTxt = contentsData[i].codeTxt;

                //리스트
                if(no <= contentsData.length + 1){
                    if(6 < contentsData[i].no){
                        workListArea += "<li class='"+no+"listItem'><div class='list_img' style='background-image: url("+imgSrc+");'></div>"
                        workListArea += "<p class='list_name'>"+title+"</p></li>";
                    }else{
                        workListArea += "<li class='"+no+"listItem onLoad'><div class='list_img' style='background-image: url("+imgSrc+");'></div>"
                        workListArea += "<p class='list_name'>"+title+"</p></li>";
                    }

                    $('ul.work_list').append(workListArea);
                }

                //팝업
                modalArea = "<div id='PF_popup' class='detail_modal no_"+no+"'><div class='prevBtn'></div><div class='closeBtn'></div><div class='detail_main_cont'>";
                modalArea += "<h2>"+title+"</h2>";
                modalArea += "<div class='work_main'><div class='clearFix'><div class='fl work_event'>";
                modalArea += "<div class='mokup_img'><div class='mokup_img_top' style='background-image: url("+imgSrc+");'><img src='./img/com_imac_img.png'></div>";
                modalArea += "<div class='mokup_img_bottom'><img src='./img/com_imac_img2.png' alt=''></div></div>";
                modalArea += "<ul class='link_btn_area'>";
                if(eventEnd == 'yes'){
                    //이벤트 종료시
                    if(!imgSrc2 == "undefined" || !imgSrc2 == null || !imgSrc2 == "" && !imgSrc3 == "undefined" || !imgSrc3 == null || !imgSrc3 == ""){
                        modalArea += "<li><a href='"+imgSrc+"' target='_blank'>VIEW IMG</a></li>";
                        modalArea += "<li><a href='"+imgSrc2+"' target='_blank'>VIEW IMG</a></li>";
                        modalArea += "<li><a href='"+imgSrc3+"' target='_blank'>VIEW IMG</a></li>";
                    }else if(!imgSrc2 == "undefined" || !imgSrc2 == null || !imgSrc2 == ""){
                        modalArea += "<li><a href='"+imgSrc+"' target='_blank'>VIEW IMG</a></li>";
                        modalArea += "<li><a href='"+imgSrc2+"' target='_blank'>VIEW IMG</a></li>";
                    }else{
                        modalArea += "<li><a href='"+imgSrc+"' target='_blank'>VIEW IMG</a></li>";
                    }
                }else{
                    //이벤트 종료x
                    if(!siteUrl2 == "undefined" || !siteUrl2 == null || !siteUrl2 == "" && !siteUrl3 == "undefined" || !siteUrl3 == null || !siteUrl3 == ""  && !siteUrl4 == "undefined" || !siteUrl4 == null || !siteUrl4 == "" ){
                        modalArea += "<li><a href='"+siteUrl+"' target='_blank'>VIEW SITE</a></li>";
                        modalArea += "<li><a href='"+siteUrl2+"' target='_blank'>VIEW SITE</a></li>";
                        modalArea += "<li><a href='"+siteUrl3+"' target='_blank'>VIEW SITE</a></li>";
                        modalArea += "<li><a href='"+siteUrl4+"' target='_blank'>VIEW SITE</a></li>";
                    }else if(!siteUrl2 == "undefined" || !siteUrl2 == null || !siteUrl2 == "" && !siteUrl3 == "undefined" || !siteUrl3 == null || !siteUrl3 == ""){
                        modalArea += "<li><a href='"+siteUrl+"' target='_blank'>VIEW SITE</a></li>";
                        modalArea += "<li><a href='"+siteUrl2+"' target='_blank'>VIEW SITE</a></li>";
                        modalArea += "<li><a href='"+siteUrl3+"' target='_blank'>VIEW SITE</a></li>";
                    }else if(!siteUrl == "undefined" || !siteUrl == null || !siteUrl == "" && !siteUrl2 == "undefined" || !siteUrl2 == null || !siteUrl2 == ""){
                        modalArea += "<li><a href='"+siteUrl+"' target='_blank'>VIEW SITE</a></li>";
                        modalArea += "<li><a href='"+siteUrl+"' target='_blank'>VIEW SITE</a></li>";
                    }else{
                        modalArea += "<li><a href='"+siteUrl+"' target='_blank'>VIEW SITE</a></li>";
                    }
                }
                modalArea += "</ul></div>";
                modalArea += "<div class='fr work_comment'><ul class='thisPage'>";
                if(eventEnd == 'yes'){
                    modalArea += "<li class='pb15'><p class='fs14'>"+urlNotice+"</p></li>";
                }
                modalArea += "<li class='pb15'><p>"+mainTxt+"</p></li>";
                if(mediaCheck == 'yes'){
                    modalArea += "<li><span class='fs14 fwB'>미디어쿼리 대응 완료</span></li>"
                }
                modalArea += "<li><b>제작기간</b>: "+makeDate+"</li>";
                modalArea += "<li><b>코딩 기여도</b>: "+participation+" <br><ul class='refer fs14'>";
                modalArea += "<li>"+participationTxt01+"</li>";
                if(!participationTxt02 == "undefined" || !participationTxt02 == null || !participationTxt02 == "" == true && !participationTxt03 == "undefined" || !participationTxt03 == null || !participationTxt03 == ""){
                    modalArea += "<li>"+participationTxt02+"</li>";
                    modalArea += "<li>"+participationTxt03+"</li>";
                }else if(!participationTxt02 == "undefined" || !participationTxt02 == null || !participationTxt02 == ""){
                    modalArea += "<li>"+participationTxt02+"</li>";
                }
                modalArea += "</ul></li>";
                if(!codeImgSrc == "undefined" || !codeImgSrc == null || !codeImgSrc == "" && !codeTxt == "undefined" || !codeTxt == null || !codeTxt == ""){
                    modalArea += "<li class='code_area'><b>참고 코드</b>:<div class='code_main'>";
                    modalArea += "<div class='code_img'><img src='"+codeImgSrc+"'></div>";
                    modalArea += "<p>"+codeTxt+"</p>";
                    modalArea += "</div></li>";
                }
                modalArea += "</div></li></ul></div></div></div><div class='nextBtn'></div></div></div>";

                $('.work_detail').append(modalArea);
            }

        }

// 클론 및 가로스크롤
        if(!mobile){
            console.log('PC 버전입니다.')
            setTimeout(function(){
                let workList = document.querySelector('.work_list');
                let workListItem = document.querySelectorAll('.work_list li');
                let move = 0;
                let listCount = workListItem.length,
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
                    for(let i=0; i<listCount; i++){
                        let cloneList = workListItem[i].cloneNode(true);
                        workList.appendChild(cloneList);
                    }
                    for(let i = listCount -1; i >=0; i-- ){
                        let cloneList = workListItem[i].cloneNode(true);
                        workList.prepend(cloneList);
                    }
                    updateWid(); //클론한 넓이값
                    setInitialPos(); //중간으로 이동
                    setTimeout(function(){
                        workList.classList.add('moveAni');
                    }, 100);
                }
                function updateWid(){
                    let currentList = document.querySelectorAll('.work_list li');
                    let newListCount = currentList.length;

                    let newWid = (listWid + listMargin) * newListCount - listMargin + 'px';
                    workList.style.width = newWid;
                }
                function setInitialPos(){
                    let initialTranslateValue = -(listWid + listMargin) * listCount;
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
            },1000);
        }else if (mobile){
            console.log('모바일 버전입니다.')
            $(".moreBtnTxt").on("click", function () {
                load('.slideArea', '4', '.moreBtnTxt');
            })

            function load(id, cnt, btn) {
                var girls_list = id + ".listItem:not(.onLoad)";
                var girls_length = $(girls_list).length;
                var girls_total_cnt;

                if (cnt < girls_length) {
                    girls_total_cnt = cnt;
                } else {
                    girls_total_cnt = girls_length;
                    $('.moreBtn').hide()
                }
                $(girls_list + ":lt(" + girls_total_cnt + ")").addClass("onLoad");
                $("#work").css({"height":"100%"});
                $(".work_list").css({"height":"auto"});
            }
        }
        //포폴 팝업
        for(var i = 0; i< contentsData.length; i++){
            $(".work_list li").on("click", function(event) {
                var thisNo = $(this).attr('class').replace(/[^0-9]/g,'');

                setTimeout(function() {
                    $(".detail_modal").eq(thisNo - 1).show(250);
                    $("body").append('<div class="backon"></div>');

                    function scrollDisable(){
                        $('body, html').addClass('hidden').on('scroll touchmove mousewheel', function(e){
                            e.preventDefault();
                        });
                    }
                    scrollDisable();
                },200);

                $('.prevBtn').on('click',function(){
                    thisNo--;

                    $(".detail_modal").eq(thisNo).show();
                    $(".detail_modal").eq(thisNo +1).hide();
                })
                $('.nextBtn').on('click',function(){
                    thisNo++;

                    $(".detail_modal").eq(thisNo).show();
                    $(".detail_modal").eq(thisNo -1).hide();
                })

            });
            break;
        }

        $("body").on("click", function(event) {
            if(event.target.className == 'closeBtn' || event.target.className == 'backon'){
                $(".detail_modal").hide(250);
                $(".backon").remove();

                function scrollAble(){
                    $('body, html').removeClass('hidden').off('scroll touchmove mousewheel');
                }
                    scrollAble();
                }
        });
    //success끝
    }
});
