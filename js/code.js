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
        $('.mobile-menu').slideToggle(400);
    });
    
    
    
    /* swiper */
    var swiper = new Swiper('.swiper-container--main', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next--main',
            prevEl: '.swiper-button-prev--main',
        },
    });
    
    var swiper = new Swiper('.swiper-container--top-brands', {
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
});