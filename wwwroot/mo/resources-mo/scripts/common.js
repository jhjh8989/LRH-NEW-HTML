/*dom tree 생성이전 시점(프레임)*/
//rem폰트설정
MUI.resize.font();

/*dom tree 생성이후 시점(프레임)*/
$(function(){

    /*전역 변수*/
    var $BODY = $('body'),
        TOUCH_CLICK = ('ontouchstart' in window) ? 'touchstart' : 'click',
        LAYER_PARENT = '.layer-wrap',
        LAYER_DIM = '.bg-dimmed';

/* 유틸start-------------------------------------------------*/
    //호스트환경 체크
    MUI.resize.chk($BODY);

    //리사이즈시 rem폰트설정, 호스트환경 체크
    MUI.resize.resize($BODY);

    //해더 상단네비 엑티브시 센터
    if($('.header-nav').length) { MUI.event.navCenter($('.header-nav'), 'active'); }

    //서브네비 엑티브시 센터
    if($('.section-nav').length) { MUI.event.navCenter($('.section-nav'), 'active'); }
    
    //textarea 자동높이 조절
    if($('.textarea.auto-height').length){
        autosize($('.textarea.auto-height textarea'));
    }

    //전체동의 열고 닫기
    if($('.chk-agree-list').length){
        MUI.event.toggle('.chk-agree-list .agree-toggle-btn', '.chk-agree-list .agree-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //drawer버튼 열기
    MUI.event.toggle('.btn-drawer', null, true, function(logic, layer) {
        console.log(11);
        $BODY.addClass("fixed");
        $('.btn-drawer-close').addClass('active');
        logic();
    });

    //drawer버튼 닫기
    MUI.event.toggle('.btn-drawer-close', null, true, function(logic, layer) {
        $BODY.removeClass("fixed");
        $('.btn-drawer').removeClass('active');
        logic();
        $('.drawer').scrollTop(0);
    });

    //햄버거 메뉴 토글
    if($('.drawer .drawer-toggle-btn').length) {
        MUI.event.toggle('.drawer .drawer-toggle-btn', '.drawer .drawer-toggle-cont', true, function(logic, layer) {
            logic();
        });
    }

    //햄버거 메뉴 상세메뉴 탭전환
    if($('.drawer .tab-normal').length){

        MUI.event.taps('.drawer .tab-normal', false, function(swap){
            swap();
        });
    }

    //gotop
    if($('.fixedRight .btn-goTop').length){
        MUI.event.goTop($('.fixedRight .btn-goTop'));
        MUI.event.topScrollCh($('.fixedRight'));
        $(window).on('scroll', function(){
            MUI.event.topScrollCh($('.fixedRight'));
        });
    }

    //차트그리기
    if($('.pie-chart').length){
        $('.pie-chart').easyPieChart({
            size:80,
            lineWidth: 7,
            barColor:'#F04040',
            trackColor:'#EBEBEB',
            scaleColor:false,
			onStep: function(from, to, percent) {
                $(this.el).find('.percent span').text(Math.round(percent));
			}
		});
    }

    //하단 퀵메뉴 모션
    if($('.fixedBottom').length) { MUI.event.fixedBottom($('.fixedBottom')); }

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
        keyTarget.on('blur', 'textarea',function(e){
            keyTarget.removeClass('active');
        });
        keyTarget.on('focus', 'textarea',function(e){
            keyTarget.addClass('active');
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


/* -------------------------------------------------유틸end*/

/* 탭 전환start-------------------------------------------------*/
if($('.specials-list .tab-normal').length){

    MUI.event.taps('.specials-list .tab-normal', false, function(swap){
        swap();
    });
}
/* -------------------------------------------------탭 전환end*/
    
/* 레이어팝업start-------------------------------------------------*/
    //제휴카드 혜택안내 풀팝업
    if($('.layer-cards').length) {
        MUI.layer.openClick('.layer-cards-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();

            if($('.layer-cards .swiper-slide').length === 1) {
                $('.layer-cards .swiper-button-prev').hide();
                $('.layer-cards .swiper-button-next').hide();
                return;
            }

            MUI.slide.init('.layer-cards .cards-lists','swiper', {
                loop: true,
                //autoHeight: true,
                pagination: {
                    el: '.layer-cards .swiper-pagination',
                    type: 'fraction',
                },
                navigation: {
                nextEl: '.layer-cards .swiper-button-next',
                prevEl: '.layer-cards .swiper-button-prev',
                },
            });
        });
    }

    //운전면허 정보안내 풀팝업
    if($('.layer-license').length) {
        MUI.layer.openClick('.layer-license-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //주소찾기 풀팝업
    if($('.layer-address').length) {
        MUI.layer.openClick('.layer-address-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //게시글작성 풀팝업
    if($('.layer-write').length) {
        MUI.layer.openClick('.layer-write-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //후기작성 안내문구 풀팝업
    if($('.layer-infos').length) {
        MUI.layer.openClick('.layer-infos-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });

        //필터 슬라이드 내 슬라이드
        $('.layer-infos .search-item-step5 #slider-price').slider({
            range: true,
            min: 30,							// 최저
            max: 60,						// 최고
            orientation: 'horizontal',		// 바타입 수평
            step: 10,						// 스텝
            values: [30, 60],				// 디폴트 값
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
                $('.layer-infos .search-item-step5 #min_slider_price').val(min);
                $('.layer-infos .search-item-step5 #max_slider_price').val(max);

                $('.layer-infos .search-item-step5 .price-txt span').each(function(idx, item){
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

        // $('.layer-infos .search-item-step5 .price-all').on('click', function(e) {
		// 	$('.layer-infos .search-item-step5 #slider-price').slider('values', [30, 60]);
        // });
        // $('.layer-infos .search-item-step5 .filter-reset-btn').on('click', function(e) {
        //     $('.layer-infos .search-item-step5 #slider-price').slider('values', [30, 60]);
        //     $('.layer-infos .search-item-step5 input').prop('checked', false);
        // });

        //필터 슬라이드 내 슬라이드
        $('.layer-infos .search-item-step6 #slider-price').slider({
            range: true,
            min: 1000,							// 최저
            max: 4000,						// 최고
            orientation: 'horizontal',		// 바타입 수평
            step: 1000,						// 스텝
            values: [1000, 4000],				// 디폴트 값
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
                $('.layer-infos .search-item-step6 #min_slider_price').val(min);
                $('.layer-infos .search-item-step6 #max_slider_price').val(max);

                $('.layer-infos .search-item-step6 .price-txt span').each(function(idx, item){
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
        
        // $('.layer-infos .search-item-step6 .price-all').on('click', function(e) {
		// 	$('.layer-infos .search-item-step6 #slider-price').slider('values', [1000, 4000]);
        // });
        // $('.layer-infos .search-item-step6 .filter-reset-btn').on('click', function(e) {
        //     $('.layer-infos .search-item-step6 #slider-price').slider('values', [1000, 4000]);
        //     $('.layer-infos .search-item-step6 input').prop('checked', false);
        // });

        //필터 슬라이드 내 슬라이드
        $('.layer-infos .search-item-step7 #slider-price').slider({
            range: true,
            min: 10000,							// 최저
            max: 200000,						// 최고
            orientation: 'horizontal',		// 바타입 수평
            step: 10000,						// 스텝
            values: [10000, 200000],				// 디폴트 값
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
                $('.layer-infos .search-item-step7 #min_slider_price').val(min);
                $('.layer-infos .search-item-step7 #max_slider_price').val(max);

                $('.layer-infos .search-item-step7 .price-txt span').each(function(idx, item){
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
        
        // $('.layer-infos .search-item-step7 .price-all').on('click', function(e) {
		// 	$('.layer-infos .search-item-step7 #slider-price').slider('values', [10000, 200000]);
        // });
        // $('.layer-infos .search-item-step7 .filter-reset-btn').on('click', function(e) {
        //     $('.layer-infos .search-item-step7 #slider-price').slider('values', [10000, 200000]);
        //     $('.layer-infos .search-item-step7 input').prop('checked', false);
		// });
    }

    //고객후기 풀팝업
    if($('.layer-review-write-detail').length) {
        MUI.layer.openClick('.layer-review-write-detail-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //후기작성 풀팝업
    if($('.layer-review-write-default').length) {
        MUI.layer.openClick('.layer-review-write-default-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //본인인증 슬라이드 팝업
    if($('.layer-certification').length) {
        MUI.layer.openClick('.layer-certification-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //차량선택 슬라이드 팝업
    if($('.layer-carSelect').length) {
        MUI.layer.openClick('.layer-carSelect-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //console.log('open');
            show();
        });
    }

    //필터 슬라이드 팝업
    if($('.layer-filter').length) {
        MUI.layer.openClick('.layer-filter-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            //alert('open');
            show();
            if(typeof(openSearchPop) === 'function') openSearchPop();
        });

        //필터 슬라이드 내 슬라이드
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

                $('.layer-filter .price-txt span').each(function(idx, item){
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

        $('.layer-filter .price-all').on('click', function(e) {
			$('#slider-price').slider('values', [0, 80]);
        });
        $('.layer-filter .filter-reset-btn').on('click', function(e) {
            $('#slider-price').slider('values', [0, 80]);
            $('.layer-filter input').prop('checked', false);
		});
    
    }

    //프로모션 슬라이드 팝업
    if($('.layer-promotion').length) {
        MUI.layer.openClick('.layer-promotion-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
        
    }

    //슬라이드 팝업 공통 닫기
    if($('.layer-slide').length) {
        MUI.layer.closeClick('.layer-slide-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            hide();
        });
    }

    //풀 팝업 공통 닫기
    if($('.layer-full').length) {
        MUI.layer.closeClick('.layer-full-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            hide();
        });
    }

    //팝업 공통 닫기
    if($('.layer-popup').length) {
        MUI.layer.closeClick('.layer-pop-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            hide();
        });
    }

    //로그인 레이어팝업
    if($('.login-wrap').length) {
        MUI.layer.openClick('.layer-login-open', LAYER_DIM, LAYER_PARENT, true, function(show){
            $('.drawer').removeClass('active');
            $('.btn-drawer').removeClass('active');
            show();
        });
        MUI.layer.closeClick('.layer-login-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            console.log('close');
            hide();
        });
    }

    //bg-dimmed 클릭시 열린 레이어 들 닫기
    MUI.layer.closeClick(LAYER_DIM, LAYER_DIM, LAYER_PARENT, true, function(hide){
        //console.log('close');
        hide();
    });
/* -------------------------------------------------레이어팝업end*/


/* 견적start-------------------------------------------------*/
    //견적 상단 슬리이더
    if($('.estimate-wrap .detail-view-list').length) {
        MUI.slide.init('.estimate-wrap .detail-view-list','swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }

    //견적 detail-layer-top 스크롤 체크
    if($('.estimate-wrap .detail-layer-top').length) {
        var $target = $('.estimate-wrap .detail-layer-top');
        $(window).on('scroll', function(){
            var winTop = $(window).scrollTop(),
                topHeight = $target.height(),
                targetTop = $target.offset().top;
            //console.log(winTop,topHeight,targetTop);
            if(winTop >= (targetTop + topHeight/2)) {
                $target.addClass('sticky');
            }
            else{
                $target.removeClass('sticky');
            }
        });
    }

    //견적 텝이동
    if($('.estimate-wrap .detail-layer-nav').length) {
        MUI.event.goTarget('.menu-link');

        $(window).on('scroll', function(){
            var scrollTop = $(this).scrollTop();
            MUI.event.scrollTaps(scrollTop, $('.estimate-wrap .layer-item'), $('.estimate-wrap .menu-link'));
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
/* -------------------------------------------------견적end*/



/* 기획전start-------------------------------------------------*/
    //기획전 상단 슬라이더
    if($('.exhibition-wrap .exhibition-view-list').length) {
        MUI.slide.init($('.exhibition-wrap .exhibition-view-list'), 'slick', {
				slidesToScroll: 1, 
				infinite: false,
				autoplay: false,
                arrows: false,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                dots: true,

        });
    }

    //기획전 스틱키
    if($('.exhibition-wrap .exhibition-sticky').length) {
        var $target = $('.exhibition-wrap .exhibition-sticky'),
            targetTop = $('.exhibition-wrap .exhibition-list-wrap').offset().top;
        $(window).on('scroll', function(){
            var winTop = $(window).scrollTop();
            if(winTop >= targetTop) {
                $target.addClass('sticky');
            }
            else{
                $target.removeClass('sticky');
            }
        });
    }
/* -------------------------------------------------기획전end*/

/* 특가상품start-------------------------------------------------*/
    //특가상품 상단 슬라이더
    if($('.specials-wrap .specials-view-list').length) {
        MUI.slide.init($('.specials-wrap .specials-view-list'), 'slick', {
				slidesToScroll: 1, 
				infinite: false,
				autoplay: false,
                arrows: false,
                slidesToShow: 2,
                //centerMode: true,
                variableWidth: true,
                //dots: true,

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
/* -------------------------------------------------계약end*/

/* 카타르시스start-------------------------------------------------*/
    //고객후기 레이어팝업 상단 슬리이더
    if($('.layer-review-write-detail .detail-view-list').length) {
        MUI.slide.init('.layer-review-write-detail .detail-view-list','swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
    if($('.click-star').length) {
        $('.click-star .star').click(function(e){
            $(this).parents().children('.star').removeClass('active');
            $(this).addClass('active').prevAll('.star').addClass('active');
            return false;
        });
    }
/* -------------------------------------------------카타르시스end*/

/* 로그인start-------------------------------------------------*/
    //로그인 견적화면 메뉴 라디오버튼 선택
    if($('.login-wrap .menu-radio-box').length) {
        $('.login-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'N'){
                $('.login-wrap .detail-normal').addClass('active');
            }
            else{
                $('.login-wrap .detail-normal').removeClass('active');
            }
        });
        $('.login-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'I'){
                $('.login-wrap .detail-integrated').addClass('active');
            }
            else{
                $('.login-wrap .detail-integrated').removeClass('active');
            }
        });
    }

    //로그인 견적화면 메뉴 토글
    if($('.login-wrap .detail-layer-integrated').length) {
        MUI.event.toggle('.detail-layer-integrated .model-toggle-btn', '.detail-layer-integrated .model-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            $('.login-wrap .detail-layer-integrated input').prop('checked', false);
            logic();
        });
    }

    //로그인 탭전환
    if($('.login-wrap .tab-normal').length){

        MUI.event.taps('.login-wrap .tab-normal', false, function(swap){
            swap();
        });
    }

    //로그인 - 회원가입 열고 닫기
    if($('.login-wrap').length){
        MUI.event.toggle('.login-wrap .join-toggle-btn', '.login-wrap .join-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }
/* -------------------------------------------------로그인end*/

/* 고객센터start-------------------------------------------------*/
    //고객센터 열고 닫기
    if($('.customer-list').length){
        MUI.event.toggle('.customer-list .customer-toggle-btn', '.customer-list .customer-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }
/* -------------------------------------------------고객센터end*/


/* 메인start-------------------------------------------------*/
    //카라이프 메인 롤링 01
    if($('.carLife-wrap .life-event-lists').length) {
        var mainTopSlide = MUI.slide.init('.carLife-wrap .life-event-lists','swiper', {
            loop: true,
            //autoHeight: true,
            autoplay: {
                delay: 3000,
            },
        });
        
        $(".swiper-button-pause").on('click', function(){
            mainTopSlide.autoplay.stop();
            $(".swiper-button-play").show();
            $(".swiper-button-pause").hide();
        });
        $(".swiper-button-play").on('click',function(){
            mainTopSlide.autoplay.start();
            $(".swiper-button-pause").show();
            $(".swiper-button-play").hide();
        });
    }

    //카라이프 메인 롤링 02
    if($('.carLife-wrap .life-event-lists02').length) {
        MUI.slide.init('.carLife-wrap .life-event-lists02','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination02',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //카라이프 메인 롤링 03
    if($('.carLife-wrap .life-event-lists03').length) {
        MUI.slide.init('.carLife-wrap .life-event-lists03','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination03',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //카라이프 메인 롤링 04
    if($('.carLife-wrap .life-event-lists04').length) {
        MUI.slide.init('.carLife-wrap .life-event-lists04','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination04',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //카라이프 메인 슬라이드 팝업
    if($('.layer-galleryThumbs').length) {
        MUI.layer.openClick('.layer-galleryThumbs-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
        
    }

    //단기예약 열고 닫기
    if($('.detail-main-accor').length){
        MUI.event.toggle('.detail-main-accor .shor-main-toggle-btn', '.detail-main-accor .shor-main-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //단기예약 - 다른지점반납 열고 닫기
    if($('.detail-main-accor').length){
        MUI.event.toggle('.detail-main-accor .shor-branch-toggle-btn', '.detail-main-accor .shor-main-list-branch', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //단기예약 메인 슬라이드 팝업 - 대여시간
    if($('.layer-firstTime').length) {
        MUI.layer.openClick('.layer-firstTime-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
        
    }

    //단기예약 메인 슬라이드 팝업 - 반납시간
    if($('.layer-lastTime').length) {
        MUI.layer.openClick('.layer-lastTime-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
        
    }

    //중고차 메인 롤링 01
    if($('.secondhand-wrap .life-event-lists').length) {
        var mainTopSlide = MUI.slide.init('.secondhand-wrap .life-event-lists','swiper', {
            loop: true,
            //autoHeight: true,
            autoplay: {
                delay: 3000,
            },
        });
        
        $(".swiper-button-pause").on('click', function(){
            mainTopSlide.autoplay.stop();
            $(".swiper-button-play").show();
            $(".swiper-button-pause").hide();
        });
        $(".swiper-button-play").on('click',function(){
            mainTopSlide.autoplay.start();
            $(".swiper-button-pause").show();
            $(".swiper-button-play").hide();
        });
    }

    //중고차 메인 롤링 02
    if($('.secondhand-wrap .life-event-lists02').length) {
        MUI.slide.init('.secondhand-wrap .life-event-lists02','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination02',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //중고차 메인 롤링 03
    if($('.secondhand-wrap .life-event-lists03').length) {
        MUI.slide.init('.secondhand-wrap .life-event-lists03','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination03',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //중고차 메인 롤링 04
    if($('.secondhand-wrap .life-event-lists04').length) {
        MUI.slide.init('.secondhand-wrap .life-event-lists04','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination04',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    //중고차 메인 롤링 05
    if($('.secondhand-wrap .life-event-lists05').length) {
        MUI.slide.init('.secondhand-wrap .life-event-lists05','swiper', {
            loop: true,
            autoHeight: true,
            pagination: {
                el: '.life-event-pagination05',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }
/* -------------------------------------------------메인end*/


/* 카라이프 start-------------------------------------------------*/

//카라이프 타봥 롤링
if($('.carLife-wrap .carLife-tabwang-swiper').length) {
    MUI.slide.init('.carLife-wrap .carLife-tabwang-swiper','swiper', {
        loop: true,
        autoHeight: true,
        pagination: {
            el: '.carLife-tabwang-pagination',
        },
        autoplay: {
            delay: 3000,
        },
    });
}
/* -------------------------------------------------카라이프 end*/

/* 단기 실시간예약 start-------------------------------------------------*/
//단기 실시간예약 다른결제수단 열고 닫기
if($('.detail-layer-short-payment').length){
    MUI.event.toggle('.detail-layer-short-payment .short-payment-toggle-btn', '.detail-layer-short-payment .short-payment-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
//단기 실시간예약 등록카드 열고 닫기
if($('.detail-layer-short-payment').length){
    MUI.event.toggle('.detail-layer-short-payment .short-registration-toggle-btn', '.detail-layer-short-payment .short-registration-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
//단기 실시간예약 카드번호직접입력 열고 닫기
if($('.detail-layer-short-payment').length){
    MUI.event.toggle('.detail-layer-short-payment .short-card-toggle-btn', '.detail-layer-short-payment .short-card-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
/* -------------------------------------------------단기 실시간예약 end*/

/* 중고차 start-------------------------------------------------*/
if($('.secondhand-wrap').length){
    $(".list-detail-top .btn-small").on('click', function(){
        if($(this).parents('.section-list').find('.list-detail-cont').hasClass('list-type-col2')){
            $(this).parents('.section-list').find('.list-detail-cont').removeClass('list-type-col2');
        }else{
            $(this).parents('.section-list').find('.list-detail-cont').addClass('list-type-col2');
        }

        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
}

//중고차 상세 롤링 01
if($('.secondhand-wrap .detail-sub-slide-list1 .life-event-lists').length) {
    var subTopSlide = MUI.slide.init('.secondhand-wrap .detail-sub-slide-list1 .detail-slide-gallery-top','swiper', {
        loop: true,
        spaceBetween: 10,
        autoplay: {
            delay: 3000,
        },
        thumbs: {
            swiper: subTopSlideThumbs
        }
    });

    var subTopSlideThumbs = MUI.slide.init('.secondhand-wrap .detail-sub-slide-list1 .detail-slide-gallery-thumbs','swiper', {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
    });
    
    $(".swiper-button-pause").on('click', function(){
        subTopSlide.autoplay.stop();
        $(".swiper-button-play").show();
        $(".swiper-button-pause").hide();
    });
    $(".swiper-button-play").on('click',function(){
        subTopSlide.autoplay.start();
        $(".swiper-button-pause").show();
        $(".swiper-button-play").hide();
    });
}
/* -------------------------------------------------중고차 end*/

/* 중고차 내차팔기 start-------------------------------------------------*/
//중고차 - 내차팔기 열고 닫기
if($('.secondhand-wrap').length){
    MUI.event.toggle('.secondhand-wrap .secondhand-toggle-btn', '.secondhand-wrap .secondhand-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
//중고차 - 내차팔기 캘린더 열고 닫기
if($('.secondhand-wrap').length){
    MUI.event.toggle('.secondhand-wrap .btn-schedule-toggle', '.secondhand-wrap .schedule-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
/* -------------------------------------------------중고차 내차팔기 end*/

/* 신차장 start-------------------------------------------------*/
//신차장 멤버십 탭전환
if($('.longTerm-membership-list .tab-normal').length){

    MUI.event.taps('.longTerm-membership-list .tab-normal', false, function(swap){
        swap();
    });
}

//신차장 멤버십 탭전환
if($('.longTerm-card-list .tab-normal').length){

    MUI.event.taps('.longTerm-card-list .tab-normal', false, function(swap){
        swap();
    });
}

//신차장 - 신차장 멤버십 열고 닫기
if($('.longTerm-wrap').length){
    MUI.event.toggle('.longTerm-wrap .longTerm-membership-toggle-btn', '.longTerm-wrap .longTerm-membership-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
//신차장 - 신차장 qna 열고 닫기
if($('.longTerm-wrap').length){
    MUI.event.toggle('.longTerm-wrap .longTerm-qna-toggle-btn', '.longTerm-wrap .longTerm-qna-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}
/* -------------------------------------------------신차장 end*/

/* 단기렌터카 start-------------------------------------------------*/
//단기렌터카 안내 열고 닫기
if($('.shor-wrap').length){
    MUI.event.toggle('.shor-wrap .shor-notice-toggle-btn', '.shor-wrap .shor-notice-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();

        //단기렌터카 부가서비스 롤링
        MUI.slide.init('.shor-wrap .shor-notice-toggle-cont .shor-notice-slide','swiper', {
            loop: true,
            autoHeight: true,
            autoplay: {
                delay: 3000,
            },
        });
    });
}

//단기렌터카 안내 탭전환
if($('.shor-notice-list .tab-normal').length){

    MUI.event.taps('.shor-notice-list .tab-normal', false, function(swap){
        swap();
    });
}

//단기렌터카 요금안내 탭전환
if($('.shor-notice-list .tab-carkind-wrap').length){

    MUI.event.taps('.shor-notice-list .tab-carkind-wrap', false, function(swap){
        swap();
    });
}

//단기렌터카 요금안내 탭전환02
if($('.shor-notice-list .shor-notice-carkind-tab .tab-carkind').length){

    MUI.event.taps('.shor-notice-list .shor-notice-carkind-tab .tab-carkind', false, function(swap){
        swap();
    });
}

//단기렌터카 요금안내 열고 닫기
if($('.shor-wrap').length){
    MUI.event.toggle('.shor-wrap .shor-notice-carkind-toggle-btn', '.shor-wrap .shor-notice-carkind-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//단기렌터카 기사포함단기렌터카 대여기간
if($('.shor-wrap').length){
    MUI.event.toggle('.shor-wrap .btn-schedule-toggle', '.shor-wrap .schedule-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

/* -------------------------------------------------단기렌터카 end*/
    
    //일반 레이어팝업 테스트 ---추후삭제
    MUI.layer.openClick('#layer-open2', LAYER_DIM, LAYER_PARENT, true, function(show){
        console.log('open');
        show();
    });
    MUI.layer.closeClick('#layer-close2', LAYER_DIM, LAYER_PARENT, true, function(hide){
        console.log('close');
        hide();
    });


    /*브라우저 모든 resources 다운 완료시점(프레임)*/
    $(window).on('load', function(){

    });

});
