import $ from "jquery"
		var RENDERER = {
	init : function(){
		this.setParameters();
		this.reconstructMethods();
		this.createParticles();
		this.render();
	},
	setParameters : function(){
		this.$container = $('#jsi-particle-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.context = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container).get(0).getContext('2d');
		this.particles = [];
	},
	reconstructMethods : function(){
		this.render = this.render.bind(this);
	},
	createParticles : function(){
		for(var i = 0, length = Math.round(this.width / 500 * this.height / 500 * 10); i < length; i++){
			this.particles.push(new PARTICLE(this.width, this.height));
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		this.context.clearRect(0, 0, this.width, this.height);
		
		for(var i = 0, length = this.particles.length; i < length; i++){
			this.particles[i].render(this.context);
		}
		this.checkCollision();
	},
	checkCollision : function(){
		for(var i = 0, particleCount = this.particles.length; i < particleCount; i++){
			var particle = this.particles[i];
			
			for(var j = i + 1; j < particleCount; j++){
				this.particles[j].checkCollision(particle);
			}
		}
	}
};
var PARTICLE = function(width, height){
	this.width = width;
	this.height = height;
	this.init();
};
PARTICLE.prototype = {
	COLOR : 'hsl(%h, 80%, %l%)',
	RADIUS : {MIN : 25, MAX : 35},
	MASS_RATE : 0.0001,
	VELOCITY : {MIN : 2, MAX : 4},
	WALL_RESTITUTION : 1.0,
	PARTICLE_RESTITUTION : 1.0,
	MAX_FACE_INDEX : 4,
	DELTA_SCALE : 0.01,
	INIT_RADIAN : 220,
	DELTA_RADIAN : {MIN : 4, MAX : 8},
	DELTA_THETA : Math.PI / 10,
	
	init : function(){
		this.radius = this.createRandomValue(this.RADIUS);
		this.mass = Math.round(Math.pow(this.radius, 3) * this.MASS_RATE);
		this.x = this.createRandomValue({MIN : this.radius, MAX : this.width - this.radius});
		this.y = this.createRandomValue({MIN : this.radius, MAX : this.height - this.radius});
		this.previousX = this.x;
		this.previousY = this.y;
		this.radian = this.INIT_RADIAN;
		this.deltaRadian = this.createRandomValue(this.DELTA_RADIAN) | 0;
		this.color = this.COLOR.replace('%h', this.radian);
		this.vx =  this.createRandomValue(this.VELOCITY) * ((Math.random() > 0.5) ? 1 : -1);
		this.vy =  this.createRandomValue(this.VELOCITY) * ((Math.random() > 0.5) ? 1 : -1);
		this.faceIndex = this.MAX_FACE_INDEX;
		this.scale = 0;
		this.theta = 0;
	},
	createRandomValue : function(range){
		return range.MIN + Math.round((range.MAX - range.MIN) * Math.random());
	},
	moveParticle : function(){
		this.previousX = this.x;
		this.previousY = this.y;
		this.x += this.vx;
		this.y += this.vy;
		
		if(this.x <= this.radius){
			this.x = this.radius;
			this.vx *= -this.WALL_RESTITUTION;
		}else if(this.x >= this.width - this.radius){
			this.x = this.width - this.radius;
			this.vx *= -this.WALL_RESTITUTION;
		}
		if(this.y <= this.radius){
			this.y = this.radius;
			this.vy *= -this.WALL_RESTITUTION;
		}else if(this.y > this.height - this.radius){
			this.y = this.height - this.radius;
			this.vy *= -this.WALL_RESTITUTION;
		}
	},
	getParticleInfo : function(){
		return {
			x : this.x,
			y : this.y,
			previousX : this.previousX,
			previousY : this.previousY,
			vx : this.vx,
			vy : this.vy,
			radius : this.radius,
			mass : this.mass,
			color : this.COLOR.replace('%h', this.radian)
		};
	},
	setParticleInfo : function(x, y, vx, vy){
		this.previousX = this.x;
		this.previousY = this.y;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		
		if(this.radian > 0){
			this.radian = Math.max(0, this.radian - this.deltaRadian);
		}
	},
	checkCollision : function(particle){
		if(this.radian == 0){
			return;
		}
		var particle1 = this.getParticleInfo(),
			particle2 = particle.getParticleInfo(),
			dx = particle2.x - particle1.x,
			dy = particle2.y - particle1.y,
			distance = Math.sqrt(dx * dx + dy * dy);
			
		if(distance > particle1.radius + particle2.radius){
			return;
		}
		var angle = Math.atan2(dy, dx),
			axis1 = {x : 0, y : 0},
			axis2 = this.rotate(dx, dy, angle),
			v1 = this.rotate(particle1.vx, particle1.vy, angle),
			v2 = this.rotate(particle2.vx, particle2.vy, angle),
			vSum = (v1.x - v2.x) * this.PARTICLE_RESTITUTION;
			
		v1.x = ((particle1.radius - particle2.radius * this.PARTICLE_RESTITUTION) * v1.x + particle2.radius * v2.x * (1 + this.PARTICLE_RESTITUTION)) / (particle1.radius + particle2.radius);
		v2.x = v1.x + vSum;
			
		var vAbs = Math.abs(v1.x) + Math.abs(v2.x),
			overlap = (particle1.radius + particle2.radius) - Math.abs(axis1.x - axis2.x);
			
		if(axis1.x >= axis2.x){
			axis1.x += Math.abs(overlap * v1.x / vAbs);
			axis2.x -= Math.abs(overlap * v2.x / vAbs);
		}else{
			axis1.x -= Math.abs(overlap * v1.x / vAbs);
			axis2.x += Math.abs(overlap * v2.x / vAbs);
		}
		axis1 = this.rotate(axis1.x, axis1.y, -angle);
		axis2 = this.rotate(axis2.x, axis2.y, -angle);
		v1 = this.rotate(v1.x, v1.y, -angle);
		v2 = this.rotate(v2.x, v2.y, -angle);
		
		this.setParticleInfo(particle1.x + axis1.x, particle1.y + axis1.y, v1.x, v1.y);
		particle.setParticleInfo(particle1.x + axis2.x, particle1.y + axis2.y, v2.x, v2.y);
	},
	rotate : function(x, y, angle){
		var sin = Math.sin(angle),
			cos = Math.cos(angle);
		return {x : x * cos + y * sin, y : y * cos - x * sin};
	},
	render : function(context){
		this.moveParticle();
		context.save();
		var axis = this.getParticleInfo();
		
		if(this.radian == 0){
			var scale = 1 + 4 * Math.pow((1 - this.scale), 5);
			context.translate(axis.x, axis.y);
			context.scale(scale, scale);
			context.rotate(Math.PI / 5 * Math.sin(this.theta));
			context.translate(-axis.x, -axis.y);
			context.globalAlpha = Math.max(0, this.scale);
			
			if(this.scale > 0){
				this.scale -= this.DELTA_SCALE;
				this.theta += this.DELTA_THETA;
				this.theta %= Math.PI * 2;
			}else{
				this.init();
			}
		}else if(this.scale < 1){
			context.translate(axis.x, axis.y);
			context.scale(this.scale, this.scale);
			context.translate(-axis.x, -axis.y);
			context.globalAlpha = this.scale;
			this.scale = Math.min(1, this.scale + this.DELTA_SCALE * 5);
		}
		context.beginPath();
		var gradient = context.createRadialGradient(axis.x, axis.y, 0, axis.x, axis.y, axis.radius);
		gradient.addColorStop(0, axis.color.replace('%l', '60'));
		gradient.addColorStop(1, axis.color.replace('%l', '30'));
		context.fillStyle = gradient;
		context.arc(axis.x, axis.y, axis.radius, 0, Math.PI * 2, true);
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = 'hsl(0, 0%, 100%)';
		context.fillStyle = 'hsl(0, 0%, 100%)';
		
		switch(Math.min(this.MAX_FACE_INDEX, Math.floor(this.radian / (this.INIT_RADIAN / (this.MAX_FACE_INDEX + 1))))){
		case 0:
			context.beginPath();
			context.moveTo(axis.x - 14, axis.y - 10);
			context.lineTo(axis.x - 4, axis.y - 2);
			context.moveTo(axis.x + 14, axis.y - 10);
			context.lineTo(axis.x + 4, axis.y - 2);
			context.moveTo(axis.x - 8, axis.y + 15);
			context.quadraticCurveTo(axis.x, axis.y + 5, axis.x + 8, axis.y + 15);
			context.stroke();
			break;
		case 1:
			context.beginPath();
			context.moveTo(axis.x - 15, axis.y - 8);
			context.quadraticCurveTo(axis.x - 10, axis.y, axis.x - 5, axis.y - 8);
			context.moveTo(axis.x + 15, axis.y - 8);
			context.quadraticCurveTo(axis.x + 10, axis.y, axis.x + 5, axis.y - 8);
			context.moveTo(axis.x - 8, axis.y + 15);
			context.quadraticCurveTo(axis.x, axis.y + 5, axis.x + 8, axis.y + 15);
			context.stroke();
			break;
		case 2:
			context.beginPath();
			context.moveTo(axis.x - 14, axis.y - 5);
			context.lineTo(axis.x - 4, axis.y - 5);
			context.moveTo(axis.x + 14, axis.y - 5);
			context.lineTo(axis.x + 4, axis.y - 5);
			context.moveTo(axis.x - 7, axis.y + 10);
			context.lineTo(axis.x + 7, axis.y + 10);
			context.stroke();
			break;
		case 3:
			context.beginPath();
			context.arc(axis.x - 10, axis.y - 5, 3, 0, Math.PI * 2, false);
			context.arc(axis.x + 10, axis.y - 5, 3, 0, Math.PI * 2, false);
			context.fill();
			context.beginPath();
			context.moveTo(axis.x - 7, axis.y + 5);
			context.quadraticCurveTo(axis.x, axis.y + 15, axis.x + 7, axis.y + 5);
			context.stroke();
			break;
		case 4:
			context.beginPath();
			context.moveTo(axis.x - 14, axis.y - 5);
			context.quadraticCurveTo(axis.x - 10, axis.y - 15, axis.x - 6, axis.y - 5);
			context.moveTo(axis.x + 14, axis.y - 5);
			context.quadraticCurveTo(axis.x + 10, axis.y - 15, axis.x + 6, axis.y - 5);
			context.moveTo(axis.x - 7, axis.y + 5);
			context.quadraticCurveTo(axis.x, axis.y + 15, axis.x + 7, axis.y + 5);
			context.stroke();
		}
		context.restore();
	}
};
$(function(){
	RENDERER.init();
});
//game
