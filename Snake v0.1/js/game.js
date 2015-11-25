var class_game=function(opt){
	var self=this;
	self.speed=opt.speed;
	self.gridNum=opt.gridNum;
};
class_game.prototype={
	init:function(){
		var self=this;
		self.initDom();
		self.snakeDom();
		self.initEvent();
		self.directionEvent();
	},
	//键盘事件
	directionEvent:function(){
		var self=this;
		$(document).bind('keydown',function(e){
			if(self.key==1){
				return;
			}
			if(e.keyCode==37){
				if(self.directionGrid==-self.gridNum && self.direction=='right'){
					return;
				}
				self.direction='right';
				self.directionGrid=self.gridNum;
				self.key=1;
			}else if(e.keyCode==38){
				if(self.directionGrid==self.gridNum && self.direction=='top'){
					return;
				}
				self.direction='top';
				self.directionGrid=-self.gridNum;
				self.key=1;
			}else if(e.keyCode==39){
				if(self.directionGrid==self.gridNum && self.direction=='right'){
					return;
				}
				self.direction='right';
				self.directionGrid=-self.gridNum;
				self.key=1;
			}else if(e.keyCode==40){
				if(self.directionGrid==-self.gridNum && self.direction=='top'){
					return;
				}
				self.direction='top';
				self.directionGrid=self.gridNum;
				self.key=1;
			}
		});
	},
	//游戏Dom
	initDom:function(){
		var self=this;
		var template='';
		template+=''+
		'<div class="htmlBox">'+
			'<div class="title">贪吃蛇 v1.0版本, 作者：弑天泣</div>'+
			'<div class="gameBox">'+
			'</div>'+
			'<div class="btnBox">'+
				'<div class="game">开始</div>'+
				'<div class="newGame" style="display:none;">重来</div>'+
				'<div class="pause">暂停</div>'+
				'<div class="start" style="display:none;">开始</div>'+
			'</div>'+
		'</div>';
		$('body').html(template);
	},
	//功能按钮
	initEvent:function(){
		var self=this;
		$('.game').bind('click',function(){
			self.newGame();
			$(this).css('display','none');
			$('.newGame').css('display','block');
		});
		$('.newGame').bind('click',function(){
			clearInterval(self.snakeAction);
			self.init();
		});
		$('.pause').bind('click',function(){
			clearInterval(self.snakeAction);
			$(this).css('display','none');
			$('.start').css('display','block');
		});
		$('.start').bind('click',function(){
			self.gameProcess();
			$(this).css('display','none');
			$('.pause').css('display','block');
		});
	},
	//新游戏开始
	newGame:function(){
		var self=this;
		self.snakeDom();
		self.direction='right';
		self.gameProcess();
	},
	//蛇Dom
	snakeDom:function(){
		var self=this;
		var template='';
		template+=''+
		'<div class="snake first" style="right:60px;top:0;"></div>'+
		'<div class="snake" style="right:40px;top:0;"></div>'+
		'<div class="snake" style="right:20px;top:0;"></div>'+
		'<div class="snake" style="right:0;top:0;"></div>';
		$('.gameBox').html(template);
	},
	//蛇事件
	gameProcess:function(){
		var self=this;
		self.directionGrid=self.gridNum;
		self.snakeAction=setInterval(function(){
			//食物事件
			self.foodEvent();
			//撞击事件
			self.gameOver();
			//蛇身跟着蛇头移动
			for (var i = $('.snake').length; i > 0; i--) {
				$('.snake').eq(i).css('right',parseInt($('.snake').eq(i-1).css('right')));
				$('.snake').eq(i).css('top',parseInt($('.snake').eq(i-1).css('top')));
			};
			//蛇头移动
			self.directionNum=parseInt($('.first').css(self.direction));
			self.directionNum+=self.directionGrid;
			$('.first').css(self.direction,self.directionNum);
			//保存行走方向
			self.passDirection=self.direction;
			self.passDirectionNum=self.directionNum;
			self.key=0;
		},self.speed)
	},
	//随机生成食物
	foodDom:function(){
		var self=this;
		self.BobX=$('.gameBox').width()/self.gridNum;
		self.BobY=$('.gameBox').height()/self.gridNum;
		self.foodX = Math.floor(Math.random()*self.BobX)*self.gridNum;
        self.foodY = Math.floor(Math.random()*self.BobY)*self.gridNum;
       	var template='';
		template+=''+
		'<div class="food" style="right:'+self.foodX+'px;top:'+self.foodY+'px;"></div>';
       	$('.gameBox').append(template);
       	//食物和蛇身重合
       	for (var i = 1 ; i < $('.snake').length; i++) {
       		if(self.foodX == parseInt($('.snake').eq(i).css('right'))&&self.foodY == parseInt($('.snake').eq(i).css('top'))){
       			$('.food').remove();
       			self.foodDom();
       			break;
			}
		};
	},
	//食物事件
	foodEvent:function(){
		var self=this;
		self.firstX=parseInt($('.first').css('right'));
		self.firstY=parseInt($('.first').css('top'));
		//吃掉食物增加长度
		if(self.firstX==self.foodX&&self.firstY==self.foodY){
			$('.food').remove();
			$('.gameBox').append('<div class="snake"></div>');
		}
		//创建食物
		if($('.food').length<1){
			self.foodDom();
		}
	},
	//游戏失败
	gameOver:function(){
		var self=this;
		//撞击活动最大范围
		if(self.firstX == $('.gameBox').width()|| self.firstX < 0||self.firstY == $('.gameBox').height()|| self.firstY<0){
			clearInterval(self.snakeAction);
			alert('失败');
		}
		//撞击身体
		for (var i = 2 ; i < $('.snake').length; i++) {
			if(self.firstX == parseInt($('.snake').eq(i).css('right'))&&self.firstY == parseInt($('.snake').eq(i).css('top'))){
				clearInterval(self.snakeAction);
				alert('失败');
			}
		};
	},
};