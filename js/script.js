lastFlyType = undefined
increaseSize = 6
score = 0
let isGameOver = false
$(document).ready(function($) {

	if(isGameOver) return
	$('body').mousedown(function(event) {
		$('.bird').stop()
		fly('up')
	});
	$('body').mouseup(function(event) {
		$('.bird').stop()
		fly('down')
	});

	$('.resetGame').click(function(eve){
		location.reload()
	})
	setTimeout(function() {
		fly('down')
	},1000)
	function fly(type) {
		if (lastFlyType!=undefined && lastFlyType!=type){
			$('.bird').stop()
		}
		offsetTop = $('.bird').offset().top - $('.world').offset().top
		topHeight = type=='up' ? offsetTop-9 : offsetTop+9
		$('.bird').animate({top: topHeight}, 50,function(){
			lastFlyType = type
			fly(type)
		});
	}

	function checkPillar(){

		setTimeout(function() {
			checkBuilding()
			checkPillar()
		})
	}
	function checkBuilding(){
		if(isGameOver) return
		pillarOffsetLeft = $('.pillarBottom').offset().left - $('.world').offset().left
		birdOffsetLeft = $('.bird').offset().left - $('.world').offset().left
		birdTop = $('.bird').offset().top - $('.world').offset().top
		birdBottom = ($('.world').height() - birdTop) - $('.bird').height()
		pillarLeftSize = ($('.pillarBottom').offset().left+$('.pillarBottom').width()) - $('.world').offset().left
		birdSize = ($('.bird').offset().left+$('.bird').width()) - $('.world').offset().left
		if (birdSize >= pillarOffsetLeft) {
			pillarBottomHeight = $('.pillarBottom').height()
			pillarTopHeight = $('.pillarTop').height()

			gameOver(false, birdBottom, birdTop, pillarLeftSize, pillarBottomHeight, pillarTopHeight)
		}
		if (birdBottom<=2) {
			gameOver(true)
		};
	}

	function gameOver(directGameOver, birdBottom, birdTop, pillarLeftSize, pillarBottomHeight, pillarTopHeight) {
		if (directGameOver || (pillarLeftSize <= 45 &&
			(birdBottom <= pillarBottomHeight || birdTop <= pillarTopHeight))) {
			$('.bird').stop();
			$('.pillarBottom, .pillarTop').stop();
			$('.game-over').show();
		}
	}

	checkPillar()

	function moveBuilding(height,width,color) {
		if(isGameOver) return
		rightSize = width + 50
		leftSize = 800
		topHeight = 350 - height
		$('.pillarBottom').css({height: height+'px', width: width+'px',left: leftSize+'px'})
		$('.pillarTop').css({height: topHeight+'px', width: width+'px',left: leftSize+'px'})
		$('.pillarBottom, .pillarTop').animate({
			left: '-'+rightSize+'px'
		},4000, function() {
			$('.pillarBottom, .pillarTop').css({left: leftSize+'px'})
			if($(this).hasClass('pillarBottom')){
				score +=1
				$('.score').text(score)
			}
			redraw()
		});
	}
	
	function redraw(){
		bottomHeight = Math.floor(Math.random() * (300 - 10)) + 10
		bottomWidth = Math.floor(Math.random() * (200 - 45)) + 30
		moveBuilding(bottomHeight,bottomWidth,'red')
	}
	redraw()

});