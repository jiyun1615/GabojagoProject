var swiper = new Swiper(".mySwiper", {
    spaceBetween: 80,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // 600px 이하가 되면 슬라이드 간 간격을 0으로
        600: {
            spaceBetween: 0
        },
    },
    
});