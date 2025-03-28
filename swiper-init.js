import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    modules: [Navigation, Pagination],
    pagination: { clickable: true },
    speed: 800,
    centeredSlides: true,
    spaceBetween: 120,
    slidesPerView: 2,
    autoplay: { delay: 4000 },
  });
});
