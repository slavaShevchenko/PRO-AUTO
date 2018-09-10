$(document).ready(function() {
    /* toping nav */
    $('.topping__nav-item--drop').on('click', function() {
        if($('.topping__nav-dropdown-wrap').is(':visible')) {
            $('.topping__nav-item--active').removeClass('topping__nav-item--active');
            $('.topping__nav-dropdown-wrap').stop().slideUp(400);
            return;
        };
        $(this).addClass('topping__nav-item--active');
        $(this).find('.topping__nav-dropdown-wrap').stop().slideDown(400);
    });
    
    $(document).on('click', function(event) {
        if($('.topping__nav-dropdown-wrap').is(':visible')) {
            if($(event.target).closest('.topping__nav-item--drop').length) return;
            $('.topping__nav-item--active').removeClass('topping__nav-item--active');
            $('.topping__nav-dropdown-wrap').stop().slideUp(400);
            event.stopPropagation();
        }
    });
    
    
    
    /* mobile menu */
    $('.mobile-menu__trigger').on('click', function() {
        if($('.mobile-menu').is(':visible')) {
            $('.mobile-menu').slideUp(400);
            $('.mobile-menu__fog').stop().animate({opacity: 0}, 400, function() {
                $(this).hide();
            });
        }
        else {
            $('.mobile-menu').slideDown(400);
            $('.mobile-menu__fog').show().stop().animate({opacity: 1}, 400);
        }
    });
    $('.mobile-menu__fog').on('click', function() {
        $('.mobile-menu').slideUp(400);
        $('.mobile-menu__fog').stop().animate({opacity: 0}, 400, function() {
            $(this).hide();
        });
    });
    
    
    
    /* swiper */
    var swiperMain = new Swiper('.swiper-container--main', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next--main',
            prevEl: '.swiper-button-prev--main',
        },
    });
    
    var swiperTopBrands = new Swiper('.swiper-container--top-brands', {
        slidesPerView: 6,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next--top-brands',
            prevEl: '.swiper-button-prev--top-brands',
        },
        breakpoints: {
            767: {
                slidesPerView: 2
            },
            1479: {
                slidesPerView: 4
            }
        }
    });

    var swiperAlsoWant = new Swiper('.swiper-container--also-want', {
        roundLengths: true,
        slidesPerView: 4,
        followFinger: false,
        pagination: {
            el: '.swiper-pagination--also-want',
            clickable: true
        },
        breakpoints: {
            575: {
                slidesPerView: 1
            },
            991: {
                slidesPerView: 2
            }
        }
    });
    
    
    
    /* select2 */
    if($('.search-filter').length) {
        $('.select2-filer--type').select2({
            width : '100%',
            minimumResultsForSearch: Infinity,
            theme: 'filter',
            placeholder: 'Type'
        });
        $('.select2-filer--stroke').select2({
            width : '100%',
            minimumResultsForSearch: Infinity,
            theme: 'filter',
            placeholder: 'Stroke'
        });
        $('.select2-filer--force').select2({
            width : '100%',
            minimumResultsForSearch: Infinity,
            theme: 'filter',
            placeholder: 'Force'
        });
        $('.select2-filer--speed').select2({
            width : '100%',
            minimumResultsForSearch: Infinity,
            theme: 'filter',
            placeholder: 'Speed'
        });
    }
    $('.select2-filer').on('select2:open', function(e){
        $('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
    });
    
    
    
    /* mobile filter */
    $('.search-filter__trigger').on('click', function() {
        if($(window).width() < 1200) {
            $(this).toggleClass('search-filter__trigger--active');
            $('.search-filter__trigger-object').slideToggle(400);
        }
    });



    /* CATALOG */
    $('.catalog-page__menu-item-trigger').on('click', function() {
        $(this).toggleClass('catalog-page__menu-item-trigger--active');
        $(this).siblings('.catalog-page__menu-item-content').slideToggle(400);
    });

    $('.catalog-page__item-price-text-info').tooltip({
        html: true,
        template: '<div class="tooltip tooltip--price-text" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });



    /* CATALOG ITEM */
    var tempSlide, finalActiveSlide;
    var swiperProductImgThumbs = new Swiper('.swiper-container--product-img-thumbs', {
        slidesPerView: 4,
        spaceBetween: 20,
        slideToClickedSlide: true,
        breakpoints: {
            575: {
                slidesPerView: 2
            }
        },
        navigation: {
            nextEl: '.swiper-button-next--product-img-thumbs',
            prevEl: '.swiper-button-prev--product-img-thumbs',
        },
        on: {
            init: function() {
                $('.swiper-container--product-img-thumbs').find('.swiper-slide-active').find('.product__thumb-item-img').addClass('product__thumb-item-img--active');
            },
            click: function() {
                if(this.clickedIndex !== undefined && this.activeIndex <= this.clickedIndex) {
                    tempSlide = this.clickedSlide;
                    $('.swiper-container--product-img-thumbs').find('.product__thumb-item-img--active').removeClass('product__thumb-item-img--active');
                    $(tempSlide).find('.product__thumb-item-img').addClass('product__thumb-item-img--active');
                    finalActiveSlide = $('.swiper-container--product-img-thumbs').find('.product__thumb-item-img--active').parents('.swiper-slide').index();
                    swiperProductImg.slideTo(finalActiveSlide);
                }
            },
            slideChangeTransitionEnd: function() {
                if(this.clickedIndex !== undefined && this.isEnd) {}
                else {
                    $('.swiper-container--product-img-thumbs').find('.product__thumb-item-img--active').removeClass('product__thumb-item-img--active');
                    $('.swiper-container--product-img-thumbs').find('.swiper-slide-active').find('.product__thumb-item-img').addClass('product__thumb-item-img--active');
                    finalActiveSlide = $('.swiper-container--product-img-thumbs').find('.product__thumb-item-img--active').parents('.swiper-slide').index();
                    swiperProductImg.slideTo(finalActiveSlide);
                    this.clickedIndex = undefined;
                }
            }
        }
    });
    var swiperProductImg = new Swiper('.swiper-container--product-img', {
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination--product-img',
            clickable: true
        },
        on: {
            slideChange: function() {
                swiperProductImgThumbs.slideTo(this.activeIndex);
                tempSlide = swiperProductImgThumbs.slides[this.activeIndex];
                $('.swiper-container--product-img-thumbs').find('.product__thumb-item-img--active').removeClass('product__thumb-item-img--active');
                $(tempSlide).find('.product__thumb-item-img').addClass('product__thumb-item-img--active');
            }
        }
    });


    /* select2 */
    if($('.select2-product').length) {
        $('.select2-product').select2({
            width : '100%',
            minimumResultsForSearch: Infinity,
            theme: 'product',
            placeholder: 'Select'
        });
    }
    $('.select2-product').on('select2:open', function(e){
        $('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
    });


    /* more-less */
    var valTemp;
    $('.one-dish__more').on('click', function() {
        valTemp = $(this).parents('.one-dish__moreless').find('input[type=text]').val();
        valTemp++;
        $(this).parents('.one-dish__moreless').find('input[type=text]').val(valTemp);
    });
    $('.one-dish__less').on('click', function() {
        valTemp = $(this).parents('.one-dish__moreless').find('input[type=text]').val();
        valTemp--;
        if(valTemp == 0) {}
        else {
            $(this).parents('.one-dish__moreless').find('input[type=text]').val(valTemp);
        }
    });



    /* tabs */
    $('.tabs').on('click', '.tabs__button', function() {
        if(!$(this).hasClass('tabs__button--active')) {
            $(this).siblings('.tabs__button--active').removeClass('tabs__button--active');
            if($(window).width() < 992 && $(this).parents('.tabs--wide').length) {
                $(this).siblings('.tabs__item:visible').slideUp(400);
                $(this).next('.tabs__item').slideDown(400);
            }
            else {
                $(this).siblings('.tabs__item:visible').hide();
                $(this).next('.tabs__item').show();
            }
            $(this).addClass('tabs__button--active');
        }
        else if($(this).hasClass('tabs__button--active') && $(window).width() < 992) {
            $(this).removeClass('tabs__button--active');
            $(this).next('.tabs__item').slideUp(400);
        }
    });



    var swiperAlsoWant = new Swiper('.swiper-container--recently1', {
        slidesPerView: 6,
        followFinger: false,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination--recently1',
            clickable: true
        },
        breakpoints: {
            767: {
                slidesPerView: 1,
                followFinger: true
            },
            991: {
                slidesPerView: 2,
                followFinger: true
            },
            1199: {
                slidesPerView: 3,
                followFinger: true
            },
            1519: {
                slidesPerView: 4,
                followFinger: true
            }
        }
    });

    var swiperAlsoWant = new Swiper('.swiper-container--recently2', {
        slidesPerView: 6,
        followFinger: false,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination--recently2',
            clickable: true
        },
        breakpoints: {
            767: {
                slidesPerView: 1,
                followFinger: true
            },
            991: {
                slidesPerView: 2,
                followFinger: true
            },
            1199: {
                slidesPerView: 3,
                followFinger: true
            },
            1519: {
                slidesPerView: 4,
                followFinger: true
            }
        }
    });
});