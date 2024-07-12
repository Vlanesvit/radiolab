function menuFunction() {
	const menus = document.querySelectorAll('.rs-header__menu');

	// Бургер-кнопка
	function burger() {
		menus.forEach(menu => {
			const menuBurgerBtns = menu.querySelectorAll('.icon-menu');

			if (menuBurgerBtns) {
				menuBurgerBtns.forEach(btn => {
					// Открываем меню
					btn.addEventListener("click", function (e) {
						e.preventDefault();

						if (document.documentElement.classList.contains("menu-open")) {
							menuClose("menu-open");
						} else {
							menuOpen("menu-open")
						}
					});
				});
			}
		});
	};
	burger()

	// Меню
	function menuInit() {
		menus.forEach(menu => {
			// Все пункты
			const menuItem = menu.querySelectorAll('.menu__body .menu__list li');

			// Все пункты с выпадающим меню
			const menuItemDropdowns = menu.querySelectorAll('.menu__list .menu__dropdown');
			const menuItemDropdownsMenu = menu.querySelectorAll('.menu__list .menu__dropdown_list');

			// 0-ой уровень
			const menuItemDropdownsNull = menu.querySelectorAll('.menu__list > .menu__dropdown');
			const menuItemDropdownsMenuNull = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list');

			// 1-ый уровень
			const menuItemDropdownsFirst = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuFirst = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list');

			// 2-ой уровень
			const menuItemDropdownsTwo = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuTwo = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list');

			// 3-ий уровень
			const menuItemDropdownsThree = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown  > .menu__dropdown_list > .menu__dropdown');
			const menuItemDropdownsMenuThree = menu.querySelectorAll('.menu__list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list > .menu__dropdown > .menu__dropdown_list');

			// Добавляем иконки в пункты с выпадающим меню
			menuItemDropdowns.forEach(item => {
				const menuLink = item.querySelector('a');
				let icon = document.createElement('i');
				icon.classList.add('menu__dropdown_arrow')
				menuLink.append(icon);
			});

			// Функция для отдельных уровней меню, чтобы открывался только один пункт, а открытые закрывались, кроме тех, кто выше уровнем
			function openLvlMenu(li, ul) {
				li.forEach(item => {
					const menuItemList = item.querySelector('ul');
					const menuItemIcons = item.querySelector('a > i');

					// Раскрываем меню при клике на иконку
					menuItemIcons.addEventListener('click', (e) => {
						e.preventDefault();
						_slideToggle(menuItemList, 500);
						ul.forEach(menu => {
							if (!menu.hasAttribute('hidden')) {
								_slideUp(menu, 500);
							}
						});

						// Проходимся по всем пунктам и ищем активные классы, убираем их и добавляем активный класс кликнутому пункту
						if (!menuItemIcons.closest('.menu__dropdown').classList.contains('_open-menu')) {
							li.forEach(itemDrop => {
								if (itemDrop.classList.contains('_open-menu')) {
									itemDrop.classList.remove('_open-menu')
								}
							});
							menuItemIcons.closest('.menu__dropdown').classList.add('_open-menu');
						} else if (menuItemIcons.closest('.menu__dropdown').classList.contains('_open-menu')) {
							menuItemIcons.closest('.menu__dropdown').classList.remove('_open-menu');
						}
					});
				});
			}

			// Пункты 0-го уровня меню
			openLvlMenu(menuItemDropdownsNull, menuItemDropdownsMenuNull)
			// Пункты 1-го уровня меню
			openLvlMenu(menuItemDropdownsFirst, menuItemDropdownsMenuFirst)
			// Пункты 2-го уровня меню
			openLvlMenu(menuItemDropdownsThree, menuItemDropdownsMenuTwo)
			// Пункты 3-го уровня меню
			openLvlMenu(menuItemDropdownsTwo, menuItemDropdownsMenuThree)

			// При клике на бургер убираем открые меню и активные класс
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__icon')) {
					menuItemDropdownsMenu.forEach(menu => {
						_slideUp(menu, 500);
					});
					menuItemDropdowns.forEach(item => {
						item.classList.remove('_open-menu');
					});
				}
			});
		});
	}
	menuInit()

	//========================================================================================================================================================
	// Дополнительные меню
	function addMenuInit(block, trigger, classes) {
		const addMenuBtns = document.querySelectorAll(trigger);
		const addMenuBlock = document.querySelector(block);

		addMenuBtns.forEach(addMenuBtn => {
			addMenuBtn.addEventListener('click', function (e) {
				e.preventDefault();
				e.stopPropagation();

				if (document.documentElement.classList.contains(classes)) {
					menuClose(classes);
				} else {

					if (document.documentElement.classList.contains('menu-open')) {
						document.documentElement.classList.remove('menu-open')
					}

					menuOpen(classes)
				}
			})

			addMenuBlock.addEventListener('click', function (e) {
				e.stopPropagation();
			});
			document.addEventListener('click', function (e) {
				menuClose(classes);
			});
		});
	}

	//========================================================================================================================================================
	// Функции открытия меню с блокировкой скролла
	function menuOpen(classes) {
		bodyLock();
		document.documentElement.classList.add(classes);
	}
	function menuClose(classes) {
		bodyUnlock();
		document.documentElement.classList.remove(classes);
	}
	function menuToggle(classes) {
		bodyLockToggle();
		document.documentElement.classList.toggle(classes);
	}
}
menuFunction()

/* ====================================
Якорные ссылки
==================================== */
// data-goto - указать ID блока
// data-goto-header - учитывать header
// data-goto-top - недокрутить на указанный размер
// data-goto-speed - скорость (только если используется доп плагин)
let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = "";
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = ".rs-header";
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains("_header-scroll")) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add("_header-scroll");
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove("_header-scroll");
				setTimeout((() => {
					headerElement.style.cssText = ``;
				}), 0);
			} else headerItemHeight = headerElement.offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed,
			header: headerItem,
			offset: offsetTop,
			easing: "linear"
		};
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;
		if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		};
	};
}
function pageNavigation() {
	document.addEventListener("click", pageNavigationAction);
	document.addEventListener("watcherCallback", pageNavigationAction);
	function pageNavigationAction(e) {
		if ("click" === e.type) {
			const targetElement = e.target;
			if (targetElement.closest("[data-goto]")) {
				const gotoLink = targetElement.closest("[data-goto]");
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
				const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if ("watcherCallback" === e.type && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			if ("navigator" === targetElement.dataset.watch) {
				document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
					const element = targetElement.classList[index];
					if (document.querySelector(`[data-goto=".${element}"]`)) {
						navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
						break;
					}
				}
				if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
			}
		}
	}
}
pageNavigation();

/* ====================================
Header при скролле
==================================== */
function headerScroll() {
	const header = document.querySelector('.rs-header');
	const headerTag = document.querySelector('header');
	let lastScrollTop = 0;

	function headerClassAdd() {
		header.classList.toggle('_header-scroll', window.scrollY > 0)
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Проверка на присутствие класса для бургер-меню. Если он есть, то шапка не скрывается
		if (document.documentElement.classList.contains("menu-open")) {
			header.style.top = "0px";
		}
		else {
			// Скрытие шапки
			if (scrollTop > lastScrollTop) {
				header.style.transform = `translateY(-${header.clientHeight}px)`;
				header.classList.remove('_header-show');
			} else {
				header.style.transform = "translateY(0px)";
				header.classList.add('_header-show');
			}
		}
		lastScrollTop = scrollTop;
	}

	window.addEventListener('scroll', function () {
		headerClassAdd()
	})
	window.addEventListener('load', function () {
		headerClassAdd()
		if (!header.classList.contains('_header-transparent')) {
			headerTag.style.height = header.clientHeight + 'px';
		}
	})
	window.addEventListener('resize', function () {
		headerClassAdd()
		if (!header.classList.contains('_header-transparent')) {
			headerTag.style.height = header.clientHeight + 'px';
		}
	})
}
headerScroll()