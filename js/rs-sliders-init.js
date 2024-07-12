/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-slider__slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-slider__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-slider__button-next');
				const pagination = sliderBlock.querySelector('.rs-slider__pagination');

				const swiperMain = new Swiper(slider, {
					// // Автопрокрутка
					// autoplay: {
					// 	// Пауза между прокруткой
					// 	delay: 10000,
					// 	// Закончить на последнем слайде
					// 	stopOnLastSlide: false,
					// 	// Отключить после ручного переключения
					// 	disableOnInteraction: false,
					// },

					// Кол-во показываемых слайдов
					slidesPerView: 1,
					spaceBetween: 30,

					// Обновить свайпер
					// при изменении элементов слайдера
					observer: true,
					// при изменении родительских элементов слайдера
					observeParents: true,
					// при изменении дочерних элементов слайдера
					observeSlideChildren: true,

					// Скорость смены слайдов
					speed: 800,

					// Включение/отключение
					// перетаскивание на ПК
					simulateTouch: true,
					allowTouchMove: true,
					// Чувствительность свайпа
					touchRadio: 1,
					// Угол срабатывания свайпа/перетаскивания
					touchAngle: 45,

					// Цикличность слайдера
					loop: true,

					// Анимация переключения
					effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Пагинация
					pagination: {
						el: pagination,
						clickable: true,
						type: 'fraction',
						formatFractionCurrent: addZero,
						formatFractionTotal: addZero
					},
				});
			});

		});
	}

	if (document.querySelector('.rs-product-slider__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-product-slider');

		sliderBlocks.forEach(slider => {
			const sliderSwiper = slider.querySelectorAll('.rs-product-slider__slider');
			const arrowPrev = slider.querySelector('.rs-product-slider__button-prev');
			const arrowNext = slider.querySelector('.rs-product-slider__button-next');
			const pagination = slider.querySelector('.rs-product-slider__pagination');

			sliderSwiper.forEach(swiper => {
				const swiperMain = new Swiper(swiper, {
					// // Автопрокрутка
					// autoplay: {
					// 	// Пауза между прокруткой
					// 	delay: 10000,
					// 	// Закончить на последнем слайде
					// 	stopOnLastSlide: false,
					// 	// Отключить после ручного переключения
					// 	disableOnInteraction: false,
					// },

					// Обновить свайпер
					// при изменении элементов слайдера
					observer: true,
					// при изменении родительских элементов слайдера
					observeParents: true,
					// при изменении дочерних элементов слайдера
					observeSlideChildren: true,

					// Скорость смены слайдов
					speed: 500,

					// Включение/отключение
					// перетаскивание на ПК
					simulateTouch: true,
					allowTouchMove: true,
					// Чувствительность свайпа
					touchRadio: 1,
					// Угол срабатывания свайпа/перетаскивания
					touchAngle: 45,
					touchStartPreventDefault: true,

					// Цикличность слайдера
					// loop: true,

					// Анимация переключения
					// effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Пагинация
					pagination: {
						el: pagination,
						clickable: true,
					},

					breakpoints: {
						0: {
							slidesPerView: 1.1,
							spaceBetween: 16,
						},
						539.98: {
							slidesPerView: 1.5,
							spaceBetween: 16,
						},
						767.98: {
							slidesPerView: 2,
							spaceBetween: 16,
						},
						991.98: {
							slidesPerView: 3,
							spaceBetween: 24,
						},
						1439.98: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
					},
				});
			});
		});
	}

	function addZero(num) {
		return (num > 9) ? num : '0' + num;
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});