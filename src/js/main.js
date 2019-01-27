
window.addEventListener('load', (e)=>{
	// Модуль паралакс эффекта
	const paralax = ( () => {
		const
			bg = document.querySelector('.header__bg')
			,user = document.querySelector('.me__inner')
			,text = document.querySelector('.header__img-portfolio');	

		

		return {
			move(block, windowScroll, rateVaue){
				let
				shift = windowScroll / -rateVaue + '%'
				,trns = 'translate3d(0,' + shift + ',0)'
				,style = block.style;
				
				style.transform = trns;
				style.webkitTransform = trns;
			},
			init(windowScroll){
				this.move(bg, windowScroll, 45);	
				this.move(user, windowScroll, 20);	
				this.move(text, windowScroll, 10);	
			}
	}
	
	})();


	// Модуль блура фона
	const blur = (function (){
		const 
			wrapp = document.querySelector('.map__block')
			, form = document.querySelector('.map__blur');
			return {
				set(){					
					let
						imgWidth = document.querySelector('.map__inner').offsetWidth
						,blockWidth = -wrapp.offsetWidth
						,blockHeight = -wrapp.offsetHeight
						,posLeft = -wrapp.offsetLeft
						,posTop = -wrapp.offsetTop
						,containerWidth = wrapp.offsetWidth / 2
						,containerHeight = wrapp.offsetHeight / 2
						,style = form.style;



					style.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
					style.backgroundPosition = (posLeft+containerWidth)  + 'px' + ' ' + (posTop + containerHeight)  + 'px';
					console.log(imgWidth + 'px' + ' ' + 'auto');
					console.log(posLeft + 'px' + ' ' + posTop + 'px');
				}
			}
	})();

	blur.set();

	window.addEventListener('resize', ()=>{
		blur.set();
	})

	window.addEventListener('scroll', ()=>{
	
		let wScroll = window.pageYOffset;
		paralax.init(wScroll);
		
	}); 

})



