cc.Class({
	extends: cc.Component,

	properties: {
		// 主角跳跃高度
		jumpHeight: 0,
		// 主角跳跃持续时间
		jumpDuration: 0,
		// 最大移动速度
		maxMoveSpeed: 0,
		// 加速度
		accel: 0,
		jumpAudio: {
			default: null,
			url: cc.AudioClip
		},
	},

	setJumpAction: function() {
		console.log("in set");
		// 跳跃上升
		var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
		// 下落
		var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
		var callback = cc.callFunc(this.playJumpSound, this);
		// 不断重复
		console.log("under call");
		return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));


	},
	playJumpSound: function() {
		// 调用声音引擎播放声音
		cc.audioEngine.playEffect(this.jumpAudio, false);
	},
	// LIFE-CYCLE CALLBACKS:
	setInputControl: function() {
		var self = this;
		// 添加键盘事件监听
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			// 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
			onKeyPressed: function(keyCode, event) {
				switch (keyCode) {
					case cc.KEY.a:
						self.accLeft = true;
						self.accRight = false;
						break;
					case cc.KEY.d:
						self.accLeft = false;
						self.accRight = true;
						break;
				}
			},
			// 松开按键时，停止向该方向的加速
			onKeyReleased: function(keyCode, event) {
				switch (keyCode) {
					case cc.KEY.a:
						self.accLeft = false;
						break;
					case cc.KEY.d:
						self.accRight = false;
						break;
				}
			}
		}, self.node);
	},

	onLoad() {
		this.jumpAction = this.setJumpAction();
		//this.node.runAction(this.jumpAction);

		// 加速度方向开关
		this.accLeft = false;
		this.accRight = false;
		// 主角当前水平方向速度
		this.xSpeed = 0;

		// 初始化键盘输入监听
		this.setInputControl();
	},

	// start() {

	// },

	update(dt) {
		if(this.isdead)
			{
			return 
			}
		// 根据当前加速度方向每帧更新速度
		if (this.accLeft) {
			this.xSpeed -= this.accel * dt;
		} else if (this.accRight) {
			this.xSpeed += this.accel * dt;
		}
		// 限制主角的速度不能超过最大值
		if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
			// if speed reach limit, use max speed with current direction
			this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
		}

		// 根据当前速度更新主角的位置
		var pos = this.node.x + this.xSpeed * dt;

		if (pos >= this.half) {
			this.node.x = this.half
			this.xSpeed = 0
		} else if (pos < -this.half) {
			this.node.x = -this.half
			this.xSpeed = 0
		} else {
			this.node.x = pos;
		}


	},
});