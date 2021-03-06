/*dom tree 생성이전 시점(프레임)*/


/*dom tree 생성이후 시점(프레임)*/
$(function(){

    /* 래디 콜백 전역 변수*/
    var $BODY = $('body'),
        TOUCH_CLICK = ('ontouchstart' in window) ? 'touchstart' : 'click',
        LAYER_PARENT = '.layer-wrap',
        LAYER_DIM = '.bg-dimmed',   
        stickyScrollObj = null;

    /*래디 콜백 전역 함수*/
    var iscrollReset = function(show, layer){
        MUI.IScrollSingle.iscrollDestroy();
        show();
        MUI.IScrollSingle.iscrollConstructor(layer + ' .layer-iscroll');
    };


/* 유틸start-------------------------------------------------*/
//textarea 자동높이 조절
if($('.textarea.auto-height').length){
    autosize($('.textarea.auto-height textarea'));
}

//차트그리기
if($('.pie-chart').length){
    $('.pie-chart').easyPieChart({
        size:110,
        lineWidth: 7,
        barColor:'#F04040',
        trackColor:'#EBEBEB',
        scaleColor:false,
        onStep: function(from, to, percent) {
            $(this.el).find('.percent span').text(Math.round(percent));
        }
    });
}

//댓글쓰기 키업이벤트
if($('.unit-text-write-wrap').length) {
    var keyTarget = $('.unit-text-write-wrap');
    keyTarget.on('keyup', 'textarea', function(e){
        if(e.target.value) {
            keyTarget.find('button').addClass('active');
        }
        else{
            keyTarget.find('button').removeClass('active');
        }
    });
}

//주소검색 키업이벤트
if($('.layer-address').length) {
    var addressTarget = $('.layer-address .layer-address-top');
    addressTarget.on('keyup', 'input', function(e){
        if(e.target.value) {
            addressTarget.find('button').addClass('active');
        }
        else{
            addressTarget.find('button').removeClass('active');
        }
    });
}


//전체동의 열고 닫기
if($('.chk-agree-list').length){
    MUI.event.toggle('.chk-agree-list .agree-toggle-btn', '.chk-agree-list .agree-toggle-cont', false, function(logic, layer) {
        //console.log(layer);
        if($(".chk-agree-list").is(':visible')){
            MUI.IScrollSingle.iscrollRefresh(500);
        }
        logic();
    });
}

//필터 범위 슬라이드
if($('.section-filter-result').length) {
    $('#slider-price').slider({
        range: true,
        min: 0,							// 최저
        max: 80,						// 최고
        orientation: 'horizontal',		// 바타입 수평
        step: 20,						// 스텝
        values: [0, 80],				// 디폴트 값
        start: function(event, ui) {	// start
        },
        slide: function(event, ui) {	// mouse movement
        },
        stop: function(event, ui) {		// stop
        },
        change: function(event, ui) {
            var min = ui.values[0],
                max = ui.values[1];

                console.log(ui, min, max);
            // update form fields
            $('#min_slider_price').val(min);
            $('#max_slider_price').val(max);

            $('.price_box_case .price-txt span').each(function(idx, item){
                var text = $(item).text(),
                    minTxt = min === 0 ? min + '원' : min + '만원',
                    maxTxt = max + '만원',
                    minRegex = RegExp(minTxt),
                    maxRegex = RegExp(maxTxt);
                if(minRegex.test(text) || maxRegex.test(text)) {
                    $(item).addClass('active');
                }
                else{
                    $(item).removeClass('active');
                }
            });

        }
    });

    $('.section-filter-result .price-all').on('click', function(e) {
        console.log(11);
        $('#slider-price').slider('values', [0, 80]);
    });
    $('.section-filter-result .filter-reset-btn').on('click', function(e) {
        $('#slider-price').slider('values', [0, 80]);
        $('.section-filter-result input').prop('checked', false);
    });
}

//필터 버튼 토글
MUI.event.toggle('.filter-result-open', null, true, function(logic, layer) {
    logic();
});

//tooltip 토글
if($('.tooltip-box').length){
    MUI.event.toggle('.tooltip-box > button', null, true, function(logic, layer) {
        $('.tooltip-box .layer-tooltip').hide();
        $('.tooltip-box button').removeClass('active');
        logic();
        layer.prev().addClass('active');
    });
    $('.tooltip-box .layer-tooltip-close').on('click', function(){
        //var $layer = $('.' + $(this).data('target'));
        //$layer.hide();
        $('.tooltip-box .layer-tooltip').hide();
        $('.tooltip-box button').removeClass('active');
    });
}


//하단 버튼바 있을시 footer padding
if($('.estimateBottom').length && $('.estimateBottom').is(':visible')){
    $('.footer').css({'padding-bottom': 200});
}

//데이트피커
MUI.event.calander(".datepicker", {
    dateFormat: 'yy-mm-dd',
    showMonthAfterYear: true,
    changeYear: false,
    changeMonth: false,
    showOn: "both",
    buttonText: "날짜선택",
    yearSuffix: '.',
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
},
function(e){
    //console.log("날짜변경됨");
});


//토스트 메시지 
if($('.toast-message-login').length){
    MUI.event.toastMessage('', 'toast-message-login', 5000);
}

if($('.toast-message-sale').length){
    MUI.event.toastMessage('', 'toast-message-sale', 5000);
}
/* -------------------------------------------------유틸end*/

/* 탭 전환start-------------------------------------------------*/
if($('.layer-login .tab-normal').length){
    MUI.event.taps('.layer-login .tab-normal', false, function(swap){
        setTimeout(function(){
            if($('.layer-login-ty01').hasClass('active')){
                MUI.layer.calculate('.layer-login-ty01');
            }
            else if($('.layer-login-ty02').hasClass('active')){
                MUI.layer.calculate('.layer-login-ty02');
            }
            //MUI.IScrollSingle.iscrollRefresh(500);
        },0);
        swap();
        
    });
}


if($('.layer-carSelect .tab-carSelect').length){
    MUI.event.taps('.layer-carSelect .tab-carSelect', false, function(swap){
        setTimeout(function(){
            if($('.layer-carSelect').hasClass('active')){
                MUI.layer.calculate('.layer-carSelect');
            }
        },0);
        swap();
        
    });
}


//특가상품 하단 탭
if($('.specials-list .tab-normal').length){

    MUI.event.taps('.specials-list .tab-normal', false, function(swap){
        swap();
    });
}

//로그인 화면 탭
if($('.login-wrap .tab-normal').length){

    MUI.event.taps('.login-wrap .tab-normal', false, function(swap){
        swap();
    });
}

//로그인 견적화면 메뉴 라디오버튼 선택
if($('.login-wrap .detail-radio').length) {
    $('.login-wrap .detail-radio').on('change', '.detail-radio-box input', function(e){
        if(e.target.value === 'P'){
            $('.login-wrap .detail-tab-wrap-P').addClass('active');
        }
        else{
            $('.login-wrap .detail-tab-wrap-P').removeClass('active');
        }
    });
    $('.login-wrap .detail-radio').on('change', '.detail-radio-box input', function(e){
        if(e.target.value === 'L'){
            $('.login-wrap .detail-tab-wrap-L').addClass('active');
        }
        else{
            $('.login-wrap .detail-tab-wrap-L').removeClass('active');
        }
    });
}

//카라이프 탭 메뉴
if($('.carLife-container .tab-normal').length){
    MUI.event.taps('.carLife-container .tab-normal', false, function(swap){
        swap();
    });
}

/* -------------------------------------------------탭 전환end*/

/* 레이어팝업start-------------------------------------------------*/
    //본인인증 슬라이드 팝업
    if($('.layer-certification').length) {
        MUI.layer.openClick('.layer-certification-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            iscrollReset(show, layer);
        });
    }

    //슬라이드 팝업 공통 닫기
    if($('.layer-slide').length) {
        MUI.layer.closeClick('.layer-slide-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            MUI.IScrollSingle.iscrollDestroy();
            hide();
        });
    }

    //고객후기 모달 팝업
    if($('.layer-review-write-detail').length) {
        MUI.layer.openClick('.layer-review-write-detail-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            if(MUI.slide.LayerSwiper) MUI.slide.LayerSwiper.destroy();
        
            //console.log('open');
            show();
            //고객후기 레이어팝업 상단 슬리이더
            $('.layer-review-write-detail .detail-view-list .swiper-pagination-wrap').hide();      
            if($('.layer-review-write-detail .detail-view-list .swiper-slide').length >= 2) {

                setTimeout(function(){
                    $('.layer-review-write-detail .detail-view-list .swiper-pagination-wrap').show();
                    MUI.slide.LayerSwiper = MUI.slide.init('.layer-review-write-detail .detail-view-list','swiper', {
                        loop: true,
                        autoHeight:true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                    MUI.slide.LayerSwiper.on('slideChange', function() { 
                        setTimeout(function(){
                            MUI.layer.calculate('.layer-review-write-detail');
                        },200);
                    });
                },0);
                
            }
            
        });
    }

    //후기작성 모달 팝업
    if($('.layer-review-write-default').length) {
        MUI.layer.openClick('.layer-review-write-default-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //차량선택 모달 팝업
    if($('.layer-carSelect').length) {
        MUI.layer.openClick('.layer-carSelect-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //프로모션 모달 팝업
    if($('.layer-promotion').length) {
        MUI.layer.openClick('.layer-promotion-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }


    //운전면허 모달 팝업
    if($('.layer-license').length) {
        MUI.layer.openClick('.layer-license-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //주소찾기 모달 팝업
    if($('.layer-address').length) {
        MUI.layer.openClick('.layer-address-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //제휴카드 혜택안내 모달 팝업
    if($('.layer-cards').length) {
        MUI.layer.openClick('.layer-cards-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //안내문구 공통 모달 팝업
    if($('.layer-infos').length) {
        MUI.layer.openClick('.layer-infos-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //모달 팝업 공통 닫기
    if($('.layer-popup').length) {
        MUI.layer.closeClick('.layer-popup-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            MUI.IScrollSingle.iscrollDestroy();
            hide();
        });
    }

    //로그인 레이어팝업
    if($('.layer-login').length) {
        MUI.layer.openClick('.layer-login-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //iscrollReset(show, layer);
            show();
        });
        MUI.layer.closeClick('.layer-login-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            //MUI.IScrollSingle.iscrollDestroy();
            hide();
        });
    }

    //bg-dimmed 클릭시 열린 레이어 들 닫기
    MUI.layer.closeClick(LAYER_DIM, LAYER_DIM, LAYER_PARENT, true, function(hide){
        //console.log('close');
        MUI.IScrollSingle.iscrollDestroy();
        hide();
    });
/* -------------------------------------------------레이어팝업end*/

/* 견적start-------------------------------------------------*/
    //견적 상단 슬리이더
    if($('.estimate-wrap .detail-view-list').length) {
        $('.estimate-wrap .detail-view-list-wrap .swiper-pagination-wrap').hide();      
        if($('.estimate-wrap .detail-view-list .swiper-slide').length >= 2) {
            $('.estimate-wrap .detail-view-list-wrap .swiper-pagination-wrap').show();
            MUI.slide.init('.estimate-wrap .detail-view-list','swiper', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                effect: 'flip',
            });
        }
        
    }

    //견적 스티키 
    if($('.estimate-wrap .detail-layer-nav').length) {
        $(window).on('scroll', function(e) {
            var scrollPos = window.scrollY || window.pageYOffset,
                $target = $('.detail-layer-nav-wrap'),
                $parent = $('.detail-layer-items-wrap'),
                stickyPos = $parent.height() - $target.find('.detail-layer-nav').height();
                parentBottomPos = $parent.offset().top + stickyPos;
                targetPos = $target.offset().top;

            if(scrollPos >= targetPos) {
                if(scrollPos >= parentBottomPos){ 
                    $target.removeClass('fixed');
                    $target.find('.detail-layer-nav').css({top: $parent.height()});
                }
                else{
                    $target.addClass('fixed');
                    $target.find('.detail-layer-nav').css({top: 0});
                }
            }
            else{
                $target.removeClass('fixed');
            }
        });
    }

    //견적 스티키 2
    if($('.estimate-wrap .detail-sticky-items').length) {
        $(window).on('scroll', function(e) {
            var scrollPos = window.scrollY || window.pageYOffset,
                $target = $('.detail-sticky-items'),
                $parent = $('.detail-layer-items-wrap'),
                $targetScroll = $target.find('.detail-sticky-iscroll'),
                parentBottomPos = $parent.offset().top + $parent.height() - $targetScroll.height(),
                targetPos = $target.offset().top;

            if(scrollPos >= targetPos) {
                if(scrollPos >= parentBottomPos){
                    $target.removeClass('fixed');
                    $target.find('.detail-sticky').css({top: $parent.height()-$targetScroll.height()});
                    if(stickyScrollObj){
                        stickyScrollObj.destroy();
                        $targetScroll.removeAttr('style'); 
                        stickyScrollObj = null;
                    }
                }
                else {
                    $target.addClass('fixed');
                    $target.find('.detail-sticky').css({top: 0});
                    if(stickyScrollObj){
                        stickyScrollObj.refresh();
                    }
                    if(!stickyScrollObj && $targetScroll.height() > $(window).height()) {
                        stickyScrollObj = new IScroll('.detail-sticky', { 
                            scrollbars: true,
                            mouseWheel: true,
                            interactiveScrollbars: true,
                            shrinkScrollbars: 'scale',
                            fadeScrollbars: true,
                        });
                    }
                    
                }
                
            }
            else{
                $target.removeClass('fixed');
                if(stickyScrollObj){
                    stickyScrollObj.destroy();
                    $targetScroll.removeAttr('style'); 
                    stickyScrollObj = null;
                }
                
            }
        });
    }

    //견적 텝이동
    if($('.estimate-wrap .detail-layer-nav').length) {
        MUI.event.goTarget('.menu-link', $('.estimate-wrap .detail-layer-nav').height());

        $(window).on('scroll', function(){
            var scrollTop = $(this).scrollTop();
            MUI.event.scrollTaps(scrollTop, $('.estimate-wrap .layer-item'), $('.estimate-wrap .detail-layer-nav'));
        });
    }
    
    //견적 step1 라디오버튼 선택
    if($('.estimate-wrap .item-step1').length) {
        $('.estimate-wrap .item-step1').on('change', '.radio-box input', function(e){
            if(e.target.value === 'E'){
                $('.estimate-wrap .electric').addClass('active');
            }
            else{
                $('.estimate-wrap .electric').removeClass('active');
            }
        });
    }

    //견적 step2 모델 선택
    if($('.estimate-wrap .item-step2').length) {
        MUI.event.toggle('.item-step2 .model-toggle-btn', '.item-step2 .model-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            $('.estimate-wrap .item-step2 input').prop('checked', false);
            logic();
        });
    }

    //견적 step6 계약조건 선택
    if($('.estimate-wrap .item-step6').length) {
        MUI.event.toggle('.item-step6 .model-toggle-btn', '.item-step6 .model-toggle-cont', true, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //견적 기본정보 토글
    if($('.summary-table-wrap .summary-toggle-btn').length) {
        MUI.event.toggle('.summary-table-wrap .summary-toggle-btn', '.summary-table-wrap .summary-toggle-cont', true, function(logic, layer) {
            logic();
        });
    }
    
    //견적 슬라이드 레이어 선택
    if($('.layer-certification').length){
        $('.radio-box2 input').on('change',function(e){
            //console.log($(this).data('type'));
            if($(this).data('type') === 'business') {
                $('.layer-certification .radio-depth').addClass('active');
            }
            else{
                $('.layer-certification .radio-depth').removeClass('active');
            }
            MUI.IScrollSingle.iscrollRefresh(500);
        }); 
    }    

/* -------------------------------------------------견적end*/

/* 기획전start-------------------------------------------------*/
    //기획전 상단 슬라이더
    if($('.exhibition-wrap .exhibition-view-list').length) {
        MUI.slide.init($('.exhibition-wrap .exhibition-view-list'), 'slick', {
				slidesToScroll: 1, 
				infinite: true,
				autoplay: false,
                arrows: true,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                dots: true,

        });
    }

    //기획전 스틱키
    if($('.exhibition-wrap .exhibition-detail-middle').length) {

        MUI.event.goTarget('.exhibition-detail-middle .menu-link', $('.exhibition-wrap .exhibition-detail-middle').height());

        var $target = $('.exhibition-wrap .exhibition-detail-middle'),
            targetHeight = $target.outerHeight();
            targetTop = $target.offset().top;

        $target.css({height: targetHeight});
        $(window).on('scroll', function(){
            var scrollTop = $(window).scrollTop();
            MUI.event.scrollTaps(scrollTop, $('.exhibition-wrap .exbit-section'), $('.exhibition-wrap .exhibition-detail-middle'));
            if(scrollTop >= targetTop) {
                $target.addClass('sticky');
            }
            else{
                $target.removeClass('sticky');
                $target.find('.menu-link').removeClass('active');
            }
        });
    }
/* -------------------------------------------------기획전end*/

/* 특가상품start-------------------------------------------------*/
    //특가상품 상단 슬라이더
    if($('.specials-wrap .specials-view-list').length) {
        MUI.slide.init($('.specials-wrap .specials-view-list'), 'slick', {
				slidesToScroll: 1, 
				infinite: true,
				autoplay: false,
                arrows: true,
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true,
                dots: true,

        });
    }

/* -------------------------------------------------특가상품end*/

/* 계약start-------------------------------------------------*/
    //계약화면 메뉴 라디오버튼 선택
    if($('.contract-wrap .menu-radio-box').length) {
        $('.contract-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'N'){
                $('.contract-wrap .detail-layer-normal').addClass('active');
            }
            else{
                $('.contract-wrap .detail-layer-normal').removeClass('active');
            }
        });
        $('.contract-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'I'){
                $('.contract-wrap .detail-layer-integrated').addClass('active');
            }
            else{
                $('.contract-wrap .detail-layer-integrated').removeClass('active');
            }
        });
    }

    //계약 기본정보 토글
    if($('.contract-wrap .contract-toggle-btn').length) {
        MUI.event.toggle('.contract-wrap .contract-toggle-btn', '.contract-wrap .contract-toggle-cont', true, function(logic, layer) {
            logic();
        });
    }
/* -------------------------------------------------계약end*/

/* 카타르시스start-------------------------------------------------*/
    
    if($('.click-star').length) {
        $('.click-star .star').click(function(e){
            $(this).parents().children('.star').removeClass('active');
            $(this).addClass('active').prevAll('.star').addClass('active');
            return false;
        });
    }
/* -------------------------------------------------카타르시스end*/

/* 로그인start-------------------------------------------------*/

/* -------------------------------------------------로그인end*/



/* 회원가입 start-------------------------------------------------*/

//통합회원가입 정보입력 토글
if($('.driver-license-accor').length){
    MUI.event.toggle('.driver-license-accor .btn-driver-license', '.driver-license-accor .driver-license-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

/* -------------------------------------------------회원가입 end*/



/* 고객센터start-------------------------------------------------*/
//고객센터 키업이벤트
if($('.sticky-search-wrap').length) {
    var addressTarget = $('.sticky-search-wrap .sticky-search');
    addressTarget.on('keyup', 'input', function(e){
        if(e.target.value) {
            addressTarget.find('button').addClass('active');
        }
        else{
            addressTarget.find('button').removeClass('active');
        }
    });
}
//고객센터 열고 닫기
if($('.customer-list').length){
    MUI.event.toggle('.customer-list .customer-toggle-btn', '.customer-list .customer-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//전국지점안내
if($('.branch-office-section').length){
    MUI.event.toggle('.accorSpotBtn', '.accorSpotCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//기사포함지점안내 리스트
if($('.branchDriverTab').length){
    MUI.event.taps('.branchDriverTab', false, function(swap){
        swap();
    });
}

//기사포함지점안내 해외 리스트
if($('.branchAbroadTab').length){
    MUI.event.taps('.branchAbroadTab', false, function(swap){
        swap();
    });
}


/* -------------------------------------------------고객센터end*/

/* 중고차장기렌터카start-------------------------------------------------*/
//상담 희망 일시 달력 버튼
if($('.schedule-accor').length){
    MUI.event.toggle('.btn-schedule-toggle', '.schedule-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//약관 동의
if($('.agreeAccor').length){
    MUI.event.toggle('.agreeBtn', '.agreeToggleCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
/* -------------------------------------------------중고차장기렌터카end*/


/* 카라이프start-------------------------------------------------*/

//타방 슬라이드
if($('.tabwang-swiper-section .carLife-tabwang-swiper').length) {
    MUI.slide.init('.tabwang-swiper-section .carLife-tabwang-swiper','swiper', {
        loop: true,
        slidesPerView: 2,
        centeredSlides: true,
        //spaceBetween: 30,
        spaceBetween: 0,
        navigation: {
            nextEl: '.tabwang-swiper-button-next',
            prevEl: '.tabwang-swiper-button-prev',
         },
        // autoplay: {
        //     delay: 3000,
        // },
    });
}

/* -------------------------------------------------카라이프end*/


/* 단기렌터카 start-------------------------------------------------*/

//차량검색
if($('.short-filter-accor').length){
    
    MUI.event.toggle('.btn-short-filter-toggle', '.short-filter-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
if($('.short-filter-accor2').length){
    
    MUI.event.toggle('.btn-short-filter-toggle2', '.short-filter-toggle-cont2', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//단기렌터카 상담하기 탭 메뉴
if($('.short-container .tab-normal').length){
    MUI.event.taps('.short-container .tab-normal', false, function(swap){
        swap();
    });
}

//
if($('.short-agree-accor').length){
    MUI.event.toggle('.btn-short-agree-toggle', '.short-agree-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
if($('.short-agree-accor').length){
    MUI.event.toggle('.btn-short-agree-toggle2', '.short-agree-toggle-cont2', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//단기렌터카 안내 - 스티키
if($('.short-container .detail-layer-nav').length) {
    MUI.event.goTarget('.menu-link', $('.short-container .detail-layer-nav').height());

    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop();
        MUI.event.scrollTaps(scrollTop, $('.short-container .layer-item'), $('.short-container .detail-layer-nav'));

        var scrollPos = window.scrollY || window.pageYOffset,
            $target = $('.detail-layer-nav-wrap'),
            $parent = $('.detail-layer-items-wrap'),
            stickyPos = $parent.height() - $target.find('.detail-layer-nav').height();
            parentBottomPos = $parent.offset().top + stickyPos;
            targetPos = $target.offset().top;

            //console.log(targetPos);
        if(scrollPos >= targetPos) {            
            if(scrollPos >= parentBottomPos){ 
                $target.removeClass('fixed');
                $target.find('.detail-layer-nav').css({top: $parent.height()});
            }
            else{
                $target.addClass('fixed');
                $target.find('.detail-layer-nav').css({top: -20});
            }
        }
        else{            
            $target.removeClass('fixed');
        }
    });
}
//대여및 요금 안내 - 요금안내의 차 종류
if($('.short-container .rentalFeeTab').length){
    MUI.event.taps('.short-container .rentalFeeTab', false, function(swap){
        swap();
    });
}
if($('.short-container .rentalFeeTab2').length){
    MUI.event.taps('.short-container .rentalFeeTab2', false, function(swap){
        swap();
    });
}

//펫카 상품 안내 - QNA 아코디언
if($('.short-container .qnaAccor').length){
    MUI.event.toggle('.qnaAccor .btn-toggle', '.qnaAccor .qnaAccorCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}


/* -------------------------------------------------단기렌터카 end*/

/* 신차장장기렌터카 start-------------------------------------------------*/

//신차장 멤버십 탭 메뉴
if($('.longTerm-container .longTermBenefitTab').length){
    MUI.event.taps('.longTerm-container .longTermBenefitTab', false, function(swap){
        swap();
    });
}
if($('.longTerm-container .longTermBenefitTab2').length){
    MUI.event.taps('.longTerm-container .longTermBenefitTab2', false, function(swap){
        swap();
    });
}
//대여 및 요금안내
if($('.fare-section .fareTab').length){
    MUI.event.taps('.fare-section .fareTab', false, function(swap){
        swap();
    });
}
if($('.fare-section .inlandFareTab').length){
    MUI.event.taps('.fare-section .inlandFareTab', false, function(swap){
        swap();
    });
}


//신차장기렌터카 안내 - 스티키
if($('.longTerm-container .detail-layer-nav').length) {
    MUI.event.goTarget('.menu-link', $('.longTerm-container .detail-layer-nav').height());

    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop();
        MUI.event.scrollTaps(scrollTop, $('.longTerm-container .layer-item'), $('.longTerm-container .detail-layer-nav'));

        var scrollPos = window.scrollY || window.pageYOffset,
            $target = $('.detail-layer-nav-wrap'),
            $parent = $('.detail-layer-items-wrap'),
            stickyPos = $parent.height() - $target.find('.detail-layer-nav').height();
            parentBottomPos = $parent.offset().top + stickyPos;
            targetPos = $target.offset().top;

            //console.log(targetPos);
        if(scrollPos >= targetPos) {            
            if(scrollPos >= parentBottomPos){ 
                $target.removeClass('fixed');
                $target.find('.detail-layer-nav').css({top: $parent.height()});
            }
            else{
                $target.addClass('fixed');
                $target.find('.detail-layer-nav').css({top: -20});
            }
        }
        else{            
            $target.removeClass('fixed');
        }
    });
}
//개인 장기 렌터카 QNA 아코디언
if($('.longTerm-container .qnaAccor').length){
    MUI.event.toggle('.qnaAccor .btn-toggle', '.qnaAccor .qnaAccorCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
if($('.longTerm-container .qnaAccor2').length){
    MUI.event.toggle('.qnaAccor2 .btn-toggle', '.qnaAccor2 .qnaAccorCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
if($('.longTerm-container .qnaAccor3').length){
    MUI.event.toggle('.qnaAccor3 .btn-toggle', '.qnaAccor3 .qnaAccorCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
if($('.longTerm-container .qnaAccor4').length){
    MUI.event.toggle('.qnaAccor4 .btn-toggle', '.qnaAccor4 .qnaAccorCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
if($('.longTerm-container .qnaAccor5').length){
    MUI.event.toggle('.qnaAccor5 .btn-toggle', '.qnaAccor5 .qnaAccorCont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}




/* -------------------------------------------------신차장장기렌터카 end*/

    //푸터 슬라이더
    if($('.footer .detail-view-list').length) {
        MUI.slide.init('.footer .detail-view-list','swiper', {
            loop: true,
            autoHeight:true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
            },
        });
        // $(".swiper-button-pause").click(function(){
        //     slide.autoplay.stop();
        // });
        // $(".swiper-button-play").click(function(){
        //     slide.autoplay.play();
        // });
    }

    //푸터 패밀리사이트 토글
    if($('.footer .family-btn').length) {
        MUI.event.toggle('.footer .family-btn', '.footer .family-toggle-cont', true, function(logic, layer) {
            logic();
        });
    }


    //헤더 전체메뉴 토글
    if($('.header .draw-btn').length) {
        MUI.event.toggle('.header .draw-btn', '.header .draw-toggle-cont', true, function(logic, layer) {
            logic();
        });
        // $('.header .draw-btn').on('focusin mouseenter', function(){
        //     $('.draw-toggle-cont').show();
        //     $('.header .draw-btn').addClass('hover');
        // });
        // $('.header .draw-btn').on('focusout mouseleave', function(){
        //     $('.draw-toggle-cont').hide(); 
        //     $('.header .draw-btn').removeClass('hover');
        // });
    }

    $('.header .draw-btn').click(function(e){
        if($('.header .specials-view-list').length) {
            MUI.slide.init($('.header .specials-view-list'), 'slick', {
                infinite: true,
                swipeToSlide: true,
                speed: 300,
                autoplay: true,
                dots: true,
                arrows: false,
                customPagin:0,
                adaptiveHeight: true,
            });
        }
        $('.slick-track').width('4000px');
        $('.slick-slide').width('1760px');
    });


/*브라우저 리사이즈*/
if($(".layer-iscroll").length){
    $(window).on("resize",function(){
        MUI.IScrollSingle.iscrollRefresh(null);
    });
}


});


/*브라우저 모든 resources 다운 완료시점(프레임)*/
$(window).on('load', function(){


});