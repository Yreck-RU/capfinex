(function($){ "use strict";

	let config = {
		'viewpoints': {
			'mobile': 320,
			'tablet': 768
		},

		'transition': 385,
	};

	// GET-параметры
	let get = window.location
			.search
			.replace('?','')
			.split('&')
			.reduce(function(p,e){
				var a = e.split('=');
				p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
				return p;
			}, {});


	// Сохраняем UTM метки при переходе на внутренние страницы сайта
	// если utm_source = self, метка не перезаписывается
	if (get['utm_source'] != undefined && get['utm_source'] != 'self'){
		$.cookie('utm_source', get['utm_source'], {path: '/', expires: 7});

		if (get['utm_medium'] != undefined) $.cookie('utm_medium', get['utm_medium'], {path: '/', expires: 7});
		if (get['utm_campaign'] != undefined) $.cookie('utm_campaign', get['utm_campaign'], {path: '/', expires: 7});
		if (get['utm_content'] != undefined) $.cookie('utm_content', get['utm_content'], {path: '/', expires: 7});
		if (get['utm_term'] != undefined) $.cookie('utm_term', get['utm_term'], {path: '/', expires: 7});
	}


	function validateForm(form){
		let errors = 0;

		form.find('.contacts-form__input').each(function (index, element){
			if ($(this).find('input').val() == ''){
				$(this).addClass('contacts-form__input--error');

				errors += 1;
			}
		});

		// if (!form.find('input[type="checkbox"]').is(':checked')){
		// 	form.find('.checkbox').addClass('checkbox--error');

		// 	errors += 1;
		// }

		// if (form.find('input[type="tel"]').val().length < 16){
		// 	form.find('input[type="tel"]').parent().addClass('input--error');
		// 	errors += 1;
		// }
			
		if (errors == 0) return true;
			else return false;
	}


	$('.js-scroll-to').on('click', function(event){
		event.preventDefault();

		let target = $(this).attr('href');
		let from = $(this).attr('data-from');

		if (from != undefined && from != ''){
			if ($('form input[name="from_section"]').length > 0){
				$('form input[name="from_section"]').val(from);
			}
		}

		if (target != '#'){
			let targetOffest = $(target).offset().top;
			targetOffest -= 40;

			$('html, body').animate({scrollTop: targetOffest}, 750);
		}
	});
	

	$('.header-lang__current').on('click', function(event){
		event.preventDefault();

		$('.header__lang').toggleClass('header__lang--active');
	});


	$('.decisions__selector').on('click', function(event){
		event.preventDefault();

		let className = 'decisions__selector--active';
		let name = $(this).attr('href').replace('#', '');

		if (!$(this).hasClass(className)){
			$('.' + className).removeClass(className);
			$(this).addClass(className);

			let oldActiveName = $('.decisions__tab--active').attr('data-name').replace('#', '');
			let oldActive = $('.decisions__tab[data-name="' + oldActiveName + '"]');


			let newActive = $('.decisions__tab[data-name="' + name + '"]');

			oldActive.removeClass('decisions__tab--active');
			newActive.addClass('decisions__tab--active');
		}
	});


	$('.platforms__selector').on('click', function(event){
		event.preventDefault();

		let className = 'platforms__selector--active';
		let name = $(this).attr('href').replace('#', '');

		if (!$(this).hasClass(className)){
			$('.' + className).removeClass(className);
			$(this).addClass(className);

			let oldActiveName = $('.platforms__tab--active').attr('data-name').replace('#', '');
			let oldActive = $('.platforms__tab[data-name="' + oldActiveName + '"]');


			let newActive = $('.platforms__tab[data-name="' + name + '"]');

			oldActive.removeClass('platforms__tab--active');
			newActive.addClass('platforms__tab--active');
		}
	});


	$('.contacts-form__select').on('click', function(event){
		$(this).toggleClass('contacts-form__select--active');
	});

	$('.contacts-form__option').on('click', function(event){
		let method = $(this).attr('data-value');
		let placeholder = $(this).attr('data-placeholder');
		let text = $(this).text();

		let inputWrapper = $(this).parent().parent().parent();
		let formWrapper = inputWrapper.parent();


		// Добавляем класс активности для селектора
		formWrapper
			.find('.contacts-form__option--active')
			.removeClass('contacts-form__option--active');

		$(this).addClass('contacts-form__option--active');


		// Меняем метод коммуникации в скрытом input
		formWrapper.find('input[name="communication_method"]').val(method);
		

		// Меняем текст у выбранного способа
		formWrapper.find('.contacts-form__selected').text(text);

		if (placeholder != undefined && placeholder != ''){
			inputWrapper.find('input').attr('placeholder', placeholder);
		}
	});


	$('.contacts-form__input').on('click', function(event){
		if ($(this).hasClass('contacts-form__input--error')){
			$(this).removeClass('contacts-form__input--error');
		}

		// Если пользователь кликнул по селектору, то фокуса на input нет
		if (event.target.className != 'contacts-form__selected'){
			$(this).find('input').focus();
		}		
	});

	$('.contacts-form__input input').focus(function(event){
		$(this).parent().addClass('contacts-form__input--focus');
	});

	$('.contacts-form__input input').blur(function(event){
		$(this).parent().removeClass('contacts-form__input--focus');
	});


	$('form').on('submit', function(event){
		event.preventDefault();

		if (validateForm($(this))){
			console.log('Форма отправлена');
		}
	});


	$('.footer-middle__social').on('click', function(event){
		event.preventDefault();
	});	


	$('.header__menu-button').on('click', function(event){
		event.preventDefault();

		let buttonClass = 'header__menu-button--active';
		let menuClass = 'header__mobile-menu--active';


		if ($(this).hasClass(buttonClass)){
			$(this).removeClass(buttonClass);
			$('.header__mobile-menu').removeClass(menuClass);
			$('body').removeClass("lock");
		} else {
			$(this).addClass(buttonClass);
			$('.header__mobile-menu').addClass(menuClass);
			//$('.header__mobile-menu').addClass(menuClass);
			$('body').addClass("lock");
		}
	});


	// $('.header-mobile-menu__category[data-name] a').on('click', function(event){
	$('.header-mobile-menu__category[data-name] .header-mobile-menu__category-inner').on('click', function(event){
		event.preventDefault();

		let parent = $(this).parent();


		if ($(window).innerWidth() > 520){
			let sectionName = parent.attr('data-name');
			let categoryClass = 'header-mobile-menu__category--active';
			let containerClass = 'header-mobile-menu__container--active';


			// Удаляем старый класс активности у секции
			$('.' + categoryClass).removeClass(categoryClass);
			parent.addClass(categoryClass);


			// Показываем нужную категорию ссылок
			$('.header-mobile-menu__container').removeClass(containerClass);
			$('.header-mobile-menu__container[data-name="' + sectionName + '"').addClass(containerClass);
		} else {
			let links = parent.find('.header-mobile-menu__subcategories');
			let className = 'header-mobile-menu__category--opened';

			if (parent.hasClass(className)){
				links.fadeOut(config.transition);
				parent.removeClass(className);
			} else {
				links.fadeIn(config.transition);
				parent.addClass(className);

				setTimeout(function(){
					links.css('display', 'flex');
				}, 0);
			}
		}
	});


	$('.header-mobile-menu__subcategory--accordion').on('click', function(event){
		event.preventDefault();

		let parent = $(this).parent();
		let links = parent.find('.header-mobile-menu__subcontainer');

		let className = 'header-mobile-menu__subcategory--active';

		if ($(this).hasClass(className)){
			links.fadeOut(config.transition);
			$(this).removeClass(className);
		} else {
			links.fadeIn(config.transition);
			$(this).addClass(className);

			setTimeout(function(){
				parent.find('.header-mobile-menu__subcontainer').css('display', 'flex');
			}, 0);
		}
	});



	$('.footer-top__link--сategory a').on('click', function(event){
		event.preventDefault();

		let parent = $(this).parent();
		let hiddenLinks = parent.parent().find('.footer-top__hidden');
		let className = 'footer-top__link--active';


		if (parent.hasClass(className)){
			// Скрываем ссылки
			parent.removeClass(className);

			hiddenLinks.slideUp(config.transition);
		} else {
			// Показываем ссылки
			parent.addClass(className);

			hiddenLinks.slideDown(config.transition);
		}
	});
})(jQuery);

document.addEventListener( 'click', (e) => {
	let buttonClass = document.querySelector('.header__menu-button');
	let menuClass = document.querySelector('.header__mobile-menu');
	let withinBoundaries = e.composedPath().includes(buttonClass);
	let withinBoundaries2 = e.composedPath().includes(menuClass);
 
	if ( ! withinBoundaries && ! withinBoundaries2) {
		//document.body.removeClass("lock");
		document.body.classList.remove('lock');
		menuClass.classList.remove('header__mobile-menu--active');
		buttonClass.classList.remove('header__menu-button--active');
		//$('.header__mobile-menu').removeClass('header__mobile-menu--active');
		//$('.header__menu-button').removeClass('header__menu-button--active');
		//alert("0");
	} else {
		//alert("1");
	}
});