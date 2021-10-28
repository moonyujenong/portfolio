; (function ($, win, doc, undefined) {
    $plugins.common = {

        init: function(v){

            // nice select
            // $('select').niceSelect();
            $plugins.common.gnb(); // gnb
            $plugins.common.noticeTicker(); // footer 공지사항 티커
            $plugins.common.termsList(); // footer 이용약관 검색
            $plugins.common.ktfamilyList(); // footer KT Family
            $plugins.common.simpleJoin(); // footer 빠른가입상담
            $plugins.common.stickyBanner(); // footer stickyBanner

            $plugins.common.carouselAct(); // carousel

            $plugins.common.listFolding(); // list folding
        },

        gnb: function(opt){
            var $btnAllmenu = $('.btn-allmenu'),
                $gnb = $('#gnb'),
                $dep1List = $gnb.find('.dep1-list');

            if ( $btnAllmenu.length ){
                $btnAllmenu.on('click', function(e){
                    e.preventDefault();
                    if ( !$('html').hasClass('gnb-open') ){

                        $('html').addClass('gnb-open');
                        $gnb.show();

                        $dep1List.find('>li').eq(0).addClass('active');
                        $dep1List.each(function(index){
                            var $this = $(this),
                                $dep1Active = $('.active').index(),
                                $depSubListWrap = $gnb.find('.dep-sub-list-wrap');

                            $depSubListWrap.eq($dep1Active).show();
                        });

                    // } else {
                    //     $('html').removeClass('gnb-open');
                    //     $gnb.hide();
                    }
                });

                $plugins.common.gnbAct();

            }
        },

        gnbAct: function(){
            var $gnb = $('#gnb'),
                $gnbClose = $gnb.find('.btn-gnb-close'),
                $dep1 = $gnb.find('.dep1'),
                $depSubListWrap = $gnb.find('.dep-sub-list-wrap'),
                $li = $depSubListWrap.find('li'),
                $depSubListItem = $depSubListWrap.find('ul');

            $gnbClose.on('click', function(e){
                e.preventDefault();
                $('html').removeClass('gnb-open');
                $plugins.common.gnbSubReset();
                $gnb.hide();
            });

            $li.each(function(){
                if ( $(this).hasClass('active') ){
                    $(this).addClass('open');
                }
            });


            if ( $depSubListItem.find('ul').length ){
                $depSubListItem.find('a + ul').before('<button class="btn-folding"><span class="hide">펼치기</span></button>')
            }

            $dep1.on('click', function(e){
                if ( !$(this).hasClass('setting') ) {
                    e.preventDefault();
                    var $this = $(this),
                        $depIdx = $dep1.index(this);
                    $dep1.parent('li').removeClass('active');
                    $this.parent('li').addClass('active');

                    $depSubListWrap.hide().eq($depIdx).show();
                }
            });

            $depSubListWrap.on('click', '.btn-folding', function(e){
                e.preventDefault();
                var $this = $(this),
                    $depSubListWrap = $gnb.find('.dep-sub-list-wrap'),
                    $depSubItem = $depSubListWrap.find('li');

                if ( !$this.parent('li').hasClass('active') ){
                    if ( $this.prev('.dep2').length ){
                        $depSubItem.removeClass('active');
                    }
                    $this.find('span').text('닫기');
                    $this.parent('li').addClass('active');
                } else {
                    $this.find('span').text('펼치기');
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').find('li').removeClass('active');
                }
            });

        },

        gnbSubReset: function() {
            var $gnb = $('#gnb'),
                $dep1ListItem = $gnb.find('.dep1-list>li'),
                $depSubListWrap = $gnb.find('.dep-sub-list-wrap'),
                $depSubItem = $depSubListWrap.find('li');

            $dep1ListItem.removeClass('active');
            $depSubItem.removeClass('active');
            $depSubListWrap.hide();
        },


        //carousel
        carouselAct: function (opt) {
            var cariuselID,
                $wrap = opt === undefined ? $('body') : opt.wrap === undefined ? $('body') : opt.wrap;

            // if ($plugins.caruselCount === 0) {
            //     return false;
            // }

            $plugins.caruselCount = $wrap.find('.swiper-container').length;

            $wrap.find('.swiper-container').each(function () {
                cariuselID = $(this).attr('id');

                $plugins.common.carouselFn(cariuselID);

            });
        },
        carouselCountFn: function () {
            $plugins.caruselCount = $plugins.caruselCount - 1;
        },
        carouselFn: function (v) {

            var cariuselID = v,
                $swiper = $('#' + cariuselID),
                $wrap = $swiper.closest('.base-carousel'),
                $swiperWrap = $swiper.find('.swiper-wrapper'),
                $pagin = $swiper.find('.swiper-pagination'),
                $prev = $swiper.find('.swiper-button-prev'),
                $next = $swiper.find('.swiper-button-next'),
                $pause = $swiper.find('.swiper-button-pause'),
                $play = $swiper.find('.swiper-button-play'),
                mainVisualSwiper,
                _length,
                space = 0,
                slidesPerView = 'auto',
                modeM,
                inpid,
                $pg2,
                $pg2c,
                $pg2t;

            if (!!$swiper.closest('.main-myinfo-carousel').length) {

                $wrap = $swiper.closest('.main-myinfo-carousel');
                $swiperWrap = $swiper.find('.swiper-wrapper');
                $swiperSlide = $swiper.find('.swiper-slide');
                $pagin = $wrap.find('.swiper-paginations');
                $prev = $wrap.find('.swiper-button-prev');
                $next = $wrap.find('.swiper-button-next');

                mainMyinfoSwiper = new Swiper($swiper, {
                    // autoplay: {
                    //     delay: 5000,
                    //     disableOnInteraction: false,
                    // },
                    loop: false,
                    centeredSlides: false,
                    slidesPerView: '1',
                    spaceBetween: 10,
                    pagination: {
                        el: $pagin,
                        clickable: true
                    },
                    navigation: {
                        nextEl: $next,
                        prevEl: $prev,
                    },
                    on: {
                        init: function () {
                            $swiper.data('load',true);
                        },
                        transitionEnd: function(){
                            $swiperWrap.find('.swiper-slide').removeClass('chg-end');
                            $swiperWrap.find('.swiper-slide-active').addClass('chg-end');

                        }
                    }
                });

            } else if (!!$swiper.closest('.main-exhibitions-carousel').length) {

                $wrap = $swiper.closest('.main-exhibitions-carousel');
                $swiperWrap = $swiper.find('.swiper-wrapper');
                $swiperSlide = $swiper.find('.swiper-slide');
                $pagin = $wrap.find('.swiper-paginations');
                $prev = $wrap.find('.swiper-button-prev');
                $next = $wrap.find('.swiper-button-next');

                mainExhibitionsSwiper = new Swiper($swiper, {
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    loop: false,
                    centeredSlides: false,
                    slidesPerView: '1',
                    spaceBetween: 20,
                    pagination: {
                        el: $pagin,
                        clickable: true
                    },
                    navigation: {
                        nextEl: $next,
                        prevEl: $prev,
                    },
                    on: {
                        init: function () {
                            $swiper.data('load',true);
                        },
                        transitionEnd: function(){
                            $swiperWrap.find('.swiper-slide').removeClass('chg-end');
                            $swiperWrap.find('.swiper-slide-active').addClass('chg-end');

                        }
                    }
                });

            } else if (!!$swiper.closest('.main-event-carousel').length) {

                $wrap = $swiper.closest('.main-event-carousel');
                $swiperWrap = $swiper.find('.swiper-wrapper');
                $swiperSlide = $swiper.find('.swiper-slide');
                $pagin = $wrap.find('.swiper-paginations');
                $prev = $wrap.find('.swiper-button-prev');
                $next = $wrap.find('.swiper-button-next');

                mainEventSwiper = new Swiper($swiper, {
                    // autoplay: {
                    //     delay: 5000,
                    //     disableOnInteraction: false,
                    // },
                    loop: false,
                    centeredSlides: false,
                    slidesPerView: '1',
                    spaceBetween: 10,
                    pagination: {
                        el: $pagin,
                        clickable: true
                    },
                    navigation: {
                        nextEl: $next,
                        prevEl: $prev,
                    },
                    on: {
                        init: function () {
                            $swiper.data('load',true);
                        },
                        transitionEnd: function(){
                            $swiperWrap.find('.swiper-slide').removeClass('chg-end');
                            $swiperWrap.find('.swiper-slide-active').addClass('chg-end');

                        }
                    }
                });

            }
        },

        noticeTicker: function(){
            $('#noticeticker').Vnewsticker({
                speed: 500,         //스크롤 스피드
                pause: 5000,        //잠시 대기 시간
                mousePause: true,   //마우스 오버시 일시정지(true=일시정지)
                showItems: 1,       //스크롤 목록 갯수 지정(1=한줄만 보임)
                direction : "up"    //left=옆으로스크롤, up=위로스크롤, 공란=아래로 스크롤
            });
        },
        termsList: function(){
            $(doc).on('click', '.ui-terms-list', function(e){
                var $popTermsList = $('#popTermsList'),
                    $popktFamilyList = $('#popktFamilyList');
                e.preventDefault();
                if ( !$popTermsList.is(':visible') ){
                    $popktFamilyList.hide();
                    $popTermsList.show();
                } else {
                    $popTermsList.hide();
                }
            });
        },
        ktfamilyList: function(){
            $(doc).on('click', '.ui-ktfamily-list', function(e){
                var $popTermsList = $('#popTermsList'),
                    $popktFamilyList = $('#popktFamilyList');
                e.preventDefault();
                if ( !$popktFamilyList.is(':visible') ){
                    $popTermsList.hide();
                    $popktFamilyList.show();
                } else {
                    $popktFamilyList.hide();
                }
            });
        },
        simpleJoin: function(){

            var $docH = $(document).height(),
                $winH = $(window).height(),
                $footerH = $('#footer').height(),
                $simpleJoin = $('#sec-simplejoin');

            if ($docH - $footerH > $winH) {
                $simpleJoin.addClass('fixed');
            } else {
                $simpleJoin.removeClass('fixed');
            }

            $(window).scroll( function() {
                var $basisH = $docH - $winH - $footerH,
                    $winTop = $(window).scrollTop();
                    $simpleJoinH = $simpleJoin.height();

                if($winTop >= $basisH) {
                    $simpleJoin.removeClass('fixed');
                } else if($winTop <= $basisH) {
                    $simpleJoin.addClass('fixed');
                }
            });

        },
        stickyBanner: function(){
            var $stickyBanner = $('#stickyBanner'),
                $goTop = $('#goTop'),
                $footer = $('#footer'),
                $footerH = $footer.innerHeight();
            if ( $stickyBanner.length ){
                $goTop.on('click', function (e) {
                    $('html, body').animate({scrollTop: 0}, 100);
                    e.preventDefault();
                });

                $(window).scroll(function () {
                    if ($(window).scrollTop() < 300) {
                        $goTop.stop().fadeOut();
                    } else {
                        $goTop.stop().fadeIn();
                    }

                    if ( Math.round($('#footer').offset().top) <= ($(window).outerHeight() + $(window).scrollTop()) ){
                        $stickyBanner.addClass('bottom')
                    } else {
                        $stickyBanner.removeClass('bottom')
                    }
                });
            }

        },

        mainSecActive: function(){
            $plugins.sectionActive();
        },

        listFolding: function(){
            var $listFoldingWrap = $('.list-folding-wrap'),
                $listFoldingQ = $listFoldingWrap.find('.list-folding-item>a'),
                $listFoldingA = $listFoldingWrap.find('.list-folding-a');

            if ( $listFoldingWrap.length ) {
                $listFoldingQ.on('click', function(e){
                    e.preventDefault();
                    var $this = $(this);

                    // $listFoldingA.hide();
                    $listFoldingA.stop().slideUp('200');
                    if ( !$this.hasClass('open') ) {
                        $listFoldingQ.removeClass('open');
                        // $this.addClass('open').next('.list-folding-a').show();
                        $this.addClass('open').next('.list-folding-a').stop().slideDown('400');
                    } else {
                        $this.removeClass('open');
                    }
                });
            }
        },

        tabClick: function(){
            var $tabType,
                $tabWrap = $('[class^=tabcont-type-]'),
                $tab = $tabWrap.find('.tabcont-tab'),
                $tabLi = $tab.find('> li'),
                $tabLiF = $tabLi.eq(0),
                $tabContw = $tabWrap.next('div'),
                $tabContF = $tabContw.find('>:first-child'),
                $tabCont = $tabContw.find('>div');

            if ($tab.length){
                $tabLiF.addClass('active');
                $tabContF.show();
                $tabLi.on('click', '> a', function(e){
                    e.preventDefault();
                    var $href = $(this).attr('href'),
                        $tabCont = $(this).closest('[class^=tabcont-type-]').next('div').find('>div'),
                        $tabLi = $(this).closest('li').siblings();

                    $tabLi.removeClass('active');
                    $(this).parent('li').addClass('active');
                    if ( $href == '#show-all' ){
                        $tabCont.show();
                    } else {
                        $tabCont.hide();
                        $($href).show();
                    }
                });
            }
        },
    }



      

})(jQuery, window, document);




$(function(){
      //sky-notice toggle class 스크립트
      $('.notice-collapse-item').on('click', function () {
          
        $(this).toggleClass('open');
        $(this).parents('.sky-notice-wrap').find('.sky-notice-content').stop().slideToggle();

    });
})