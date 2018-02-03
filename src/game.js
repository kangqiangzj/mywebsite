function game(){
var game = {
			canvas: document.getElementById("canvas"),
            ctx: document.getElementById("canvas").getContext("2d"),
            cellCount: 9,  //九宫格
            cellWidth: 30,  //方格大小
            lineCount: 5,
            mode: 7,
            actions: {},
            play: function (name, action, interval) {
                var me = this;
                this.actions[name] = setInterval(function () {
                    action();
                    me.draw();
                }, interval || 50);
            },
            stop: function (name) {
                clearInterval(this.actions[name]);
                this.draw();
            },
            colors: ["red", "#039518", "#ff00dc", "#ff6a00", "gray", "#0094ff", "#d2ce00"],
            start: function () {
                this.map.init();
                this.ready.init();
                this.draw();
                this.canvas.onclick = this.onclick;
            },
            over: function () {
                alert("GAME OVER");
                this.onclick = function () {
                    return false;
                };
            },
            draw: function () {
                this.ctx.clearRect(0, 0, 400, 600);
                this.ctx.save();
                this.map.draw();
                this.ready.draw();
                this.score.draw();
                this.ctx.restore();
            },
            clicked: null,
            isMoving: function () {
                return this.ready.isMoving || this.map.isMoving;
            },
            onclick: function (e) {
                if (game.isMoving()) {
                    return;
                }
                var px = (e.offsetX || (e.clientX - game.canvas.offsetLeft)) - game.map.startX;
                var py = (e.offsetY || (e.clientY - game.canvas.offsetTop)) - game.map.startY;
                if (px < 0 || py < 0 || px > game.map.width || py > game.map.height) {
                    return;
                }
                var x = parseInt(px / game.cellWidth);
                var y = parseInt(py / game.cellWidth);
                var clicked = game.clicked;
                var bubble = game.map.getBubble(x, y);
                if (bubble.color) {
                    if (clicked) {
                        //同一个泡不做反映
                        if (clicked.x == x && clicked.y == y) {
                            return;
                        }
                        clicked.stop();
                    }
                    clicked = game.clicked = bubble;
                    bubble.play();
                }
                else {
                    if (clicked) {
                        clicked.stop();
                        //移动clicked
                        game.map.move(clicked, bubble);
                    }
                }
                //console.log("x:" + x + " y:" + y);
            },
            getRandom: function (max) {
                return parseInt(Math.random() * 1000000 % (max));
            },
        };
        game.score = {
            basic: 0,
            operate: 0,
            star1: 0,
            star2: 0,
            boom: 0,
            draw: function () {
                var startX = game.cellWidth * 10 + game.map.startX;
                var startY = game.map.startY;
                var ctx = game.ctx;
                ctx.save();
                ctx.translate(startX, startY);
                ctx.clearRect(0, 0, 150, 400);
                ctx.strokeStyle = "#456";
                //ctx.strokeRect(0, 0, 150, 200);
                ctx.font = "24px 微软雅黑";
                ctx.fillStyle = "#fefefe";
                ctx.fillText("得分:" + (this.basic * 5 + this.star1 * 8 + this.star2 * 10 + this.boom * 20), 0, 30);
                ctx.stroke();
                ctx.restore();
            },
            addScore: function (length) {
                switch (length) {
                    case 5:
                        this.basic++;
                        break;
                    case 6:
                        this.star1++;
                        break;
                    case 7:
                        this.star2++;
                        break;
                    default:
                        this.boom++;
                        break;
                }
                this.draw();
            },
        };
        game.ready = {
            startX: 41.5,
            startY: 21.5,
            width: game.cellWidth * 3,
            height: game.cellWidth,
            bubbles: [],
            init: function () {
                this.genrate();
                var me = this;
                me.flyin();
            },
            genrate: function () {
                for (var i = 0; i < 3; i++) {
                    var color = game.colors[game.getRandom(game.mode)];
                    this.bubbles.push(new Bubble(i, 0, color));
                }
                //console.log(this.bubbles);
            },
            draw: function () {
                var ctx = game.ctx;
                ctx.save();
                ctx.translate(this.startX, this.startY);
                ctx.beginPath();
                ctx.strokeStyle = "#555";
                ctx.strokeRect(0, 0, this.width, this.height);
                ctx.stroke();
                //绘制准备的泡
                this.bubbles.forEach(function (bubble) {
                    bubble.draw();
                });

                ctx.restore();
            },
            isMoving: false,
            flyin: function () {
                var emptys = game.map.getEmptyBubbles();
                if (emptys.length < 3) {
                    //GAME OVER
                    game.over();
                    return;
                }
                var me = this;
                var status = [0, 0, 0];
                var times = 1;
                game.play("flyin", function () {
                    if (status[0] && status[1] && status[2]) {
                        game.stop("flyin");
                        me.isMoving = false;
                        status = [0, 0, 0];
                        me.bubbles = [];
                        me.genrate();
                        return;
                    }
                    me.isMoving = true;
                    for (var i = 0; i < me.bubbles.length; i++) {
                        if (status[i]) {
                            continue;
                        }
                        var target = emptys[i];
                        var x2 = target.px + game.map.startX - me.startX;
                        var y2 = target.py + game.map.startY - me.startY;
                        var current = me.bubbles[i];
                        var step = Math.abs(x2 - current.px)/10 || Math.abs(y2 - current.y)/10;
                        if (current.px < x2) {
                            current.py = ((y2 - current.py) / (x2 - current.px)) * step + current.py;
                            current.px += step;
                            if (current.px > x2) {
                                current.px = x2;
                            }
                        }
                        else if (current.px > x2) {
                            current.py = ((y2 - current.py) / (current.px - x2)) * step + current.py;
                            current.px -= step;
                            if (current.px < x2) {
                                current.px = x2;
                            }
                        }
                        else {
                            current.py += step;
                        }
                        if (current.py > y2) {
                            current.py = y2;
                        }
                        if (parseInt(current.px+0.1) == x2 && parseInt(current.py+0.1) == y2) {
                            status[i] = 1;
                            current.x = target.x;
                            current.y = target.y;
                            game.map.addBubble(current);
                            game.map.clearLine(current.x, current.y, current.color, false);
                        }
                    }
                }, 10);

            }
        };
        game.map = {
            startX: 40.5,  //棋盘X坐标
            startY: 60.5,  //棋盘Y坐标
            width: game.cellCount * game.cellWidth,
            height: game.cellCount * game.cellWidth,
            bubbles: [],
            init: function () {
                for (var i = 0; i < game.cellCount; i++) {
                    var row = [];
                    for (var j = 0; j < game.cellCount; j++) {
                        row.push(new Bubble(j, i, null));
                    }
                    this.bubbles.push(row);
                }
            },
            clearLine: function (x1, y1, color, isClick) {
                if (this.isEmpty(x1, y1)) {
                    if (isClick) game.ready.flyin();
                    return;
                };
                //给定一个坐标，看是否有满足的line可以被消除
                //4根线 一  | / \
                //横线
                var current = this.getBubble(x1, y1);
                if (!current.color) {
                    console.log(current);
                }
                var arr1, arr2, arr3, arr4;
                arr1 = this.bubbles[y1];
                arr2 = [];
                for (var y = 0; y < game.cellCount; y++)
                    arr2.push(this.getBubble(x1, y));
                arr3 = [current];
                arr4 = [current];
                for (var i = 1; i < game.cellCount ; i++) {
                    if (x1 - i >= 0 && y1 - i >= 0)
                        arr3.unshift(this.getBubble(x1 - i, y1 - i));
                    if (x1 + i < game.cellCount && y1 + i < game.cellCount)
                        arr3.push(this.getBubble(x1 + i, y1 + i));

                    if (x1 - i >= 0 && y1 + i < game.cellCount)
                        arr4.push(this.getBubble(x1 - i, y1 + i));
                    if (x1 + i < game.cellCount && y1 - i >= 0)
                        arr4.unshift(this.getBubble(x1 + i, y1 - i));
                }
                var line1 = getLine(arr1);
                var line2 = getLine(arr2);
                var line3 = getLine(arr3);
                var line4 = getLine(arr4);
                var line = line1.concat(line2).concat(line3).concat(line4);
                if (line.length < 5) {
                    if (isClick) game.ready.flyin();
                    return;
                }
                else {
                    var me = this;
                    var i = 0;
                    game.play("clearline", function () {
                        if (i == line.length) {
                            game.score.addScore(line.length);
                            game.stop("clearline");
                            me.isMoving = false;
                            //game.ready.flyin();
                            return;
                        }
                        me.isMoving = true;
                        var p = line[i];
                        me.setBubble(p.x, p.y, null);
                        i++;
                    }, 100);
                }
                function getLine(bubbles) {

                    var line = [];
                    for (var i = 0; i < bubbles.length; i++) {
                        var b = bubbles[i];
                        if (b.color == color) {
                            line.push({ "x": b.x, "y": b.y });
                        }
                        else {
                            if (line.length < 5)
                                line = [];
                            else
                                return line;
                        }
                    }
                    if (line.length < 5)
                        return [];
                    return line;
                }
            },
            draw: function () {
                var ctx = game.ctx;
                ctx.save();
                ctx.translate(this.startX, this.startY);
                ctx.beginPath();
                for (var i = 0; i <= game.cellCount; i++) {
                    var p1 = i * game.cellWidth;;
                    ctx.moveTo(p1, 0);
                    ctx.lineTo(p1, this.height);

                    var p2 = i * game.cellWidth;
                    ctx.moveTo(0, p2);
                    ctx.lineTo(this.width, p2);
                }
                ctx.strokeStyle = "#555";
                ctx.stroke();
                //绘制子元素（所有在棋盘上的泡）
                this.bubbles.forEach(function (row) {
                    row.forEach(function (bubble) {
                        bubble.draw();
                    });
                });
                ctx.restore();
            },
            isMoving: false,
            move: function (bubble, target) {
                var path = this.search(bubble.x, bubble.y, target.x, target.y);
                if (!path) {
                    //显示不能移动s
                    //alert("过不去");
                    return;
                }
                //map开始播放当前泡的移动效果
                //两种实现方式，1、map按路径染色，最后达到目的地 2、map生成一个临时的bubble负责展示，到目的地后移除
                //console.log(path);
                var me = this;
                var name = "move_" + bubble.x + "_" + bubble.y;
                var i = path.length - 1;
                var color = bubble.color;
                game.play(name, function () {
                    if (i < 0) {
                        game.stop(name);
                        game.clicked = null;
                        me.isMoving = false;
                        me.clearLine(target.x, target.y, color, true);
                        return;
                    }
                    me.isMoving = true;
                    path.forEach(function (cell) {
                        me.setBubble(cell.x, cell.y, null);
                    });
                    var currentCell = path[i];
                    me.setBubble(currentCell.x, currentCell.y, color);
                    i--;
                }, 50);
            },
            search: function (x1, y1, x2, y2) {
                var history = [];
                var goalCell = null;
                var me = this;
                getCell(x1, y1, null);
                if (goalCell) {
                    var path = [];

                    var cell = goalCell;
                    while (cell) {
                        path.push({ "x": cell.x, "y": cell.y });
                        cell = cell.parent;
                    }
                    return path;
                }
                return null;
                function getCell(x, y, parent) {
                    if (x >= me.bubbles.length || y >= me.bubbles.length)
                        return;
                    if (x != x1 && y != y2 && !me.isEmpty(x, y))
                        return;

                    for (var i = 0; i < history.length; i++) {
                        if (history[i].x == x && history[i].y == y)
                            return;
                    }
                    var cell = { "x": x, "y": y, child: [], "parent": parent };
                    history.push(cell);

                    if (cell.x == x2 && cell.y == y2) {
                        goalCell = cell;
                        return cell;
                    }
                    var child = [];
                    var left, top, right, buttom;
                    //最短路径的粗略判断就是首选目标位置的大致方向
                    if (x - 1 >= 0 && me.isEmpty(x - 1, y))
                        child.push({ "x": x - 1, "y": y });
                    if (x + 1 < me.bubbles.length && me.isEmpty(x + 1, y))
                        child.push({ "x": x + 1, "y": y });
                    if (y + 1 < me.bubbles.length && me.isEmpty(x, y + 1))
                        child.push({ "x": x, "y": y + 1 });
                    if (y - 1 >= 0 && me.isEmpty(x, y - 1))
                        child.push({ "x": x, "y": y - 1 });
                    var distance = [];
                    for(var i=0;i<child.length;i++){
                        var c = child[i];
                        if(c){
                            distance.push({"i":i,"d":Math.abs(x2 - c.x) + Math.abs(y2 - c.y)});
                        }else{
                            distance.push({"i":i,"d":-1});
                        }
                    };
                    distance.sort(function (a, b) { return a.d - b.d });
                    for (var i = 0; i < child.length; i++) {
                        var d = distance[i];
                        var c = child[d.i];
                        if (c) cell.child.push(getCell(c.x, c.y, cell));
                    }
                    return cell;
                }
            },
            getEmptyBubbles: function () {
                var empties = [];
                this.bubbles.forEach(function (row) {
                    row.forEach(function (bubble) {
                        if (!bubble.color) {
                            empties.push(new Bubble(bubble.x, bubble.y));
                        }
                    });
                });
                if (empties.length <= 3) {
                    return [];
                }
                var result = [];
                var useds = [];
                for (var i = 0; i < empties.length; i++) {
                    if (result.length == 3) {
                        break;
                    }
                    var isUsed = false;
                    var ra = game.getRandom(empties.length);
                    for (var m = 0; m < useds.length; m++) {
                        isUsed = ra === useds[m];
                        if (isUsed) break;
                    }
                    if (!isUsed) {
                        result.push(empties[ra]);
                        useds.push(ra);
                    }
                }
                //console.log(useds);
                return result;
            },
            addBubble: function (bubble) {
                var thisBubble = this.getBubble(bubble.x, bubble.y);
                thisBubble.color = bubble.color;
            },
            setBubble: function (x, y, color) {
                this.getBubble(x, y).color = color;
            },
            getBubble: function (x, y) {
                if (x < 0 || y < 0 || x > game.cellCount || y > game.cellCount) return null;
                return this.bubbles[y][x];
            },
            isEmpty: function (x, y) {
                var bubble = this.getBubble(x, y);
                return !bubble.color;
            },
        };
        var Cell = function (x, y) {
            this.x = x;
            this.y = y;
        }
        var Bubble = function (x, y, color) {
            this.x = x;
            this.y = y;
            this.px = game.cellWidth * (this.x + 1) - game.cellWidth / 2;
            this.py = game.cellWidth * (this.y + 1) - game.cellWidth / 2;
            this.color = color;
            this.light = 10;
        };
        Bubble.prototype.draw = function () {
            if (!this.color) {
                return;
            }
            var ctx = game.ctx;
            ctx.beginPath();
            //console.log("x:" + px + "y:" + py);
            var gradient = ctx.createRadialGradient(this.px - 5, this.py - 5, 0, this.px, this.py, this.light);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, this.color);
            ctx.arc(this.px, this.py, 11, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.stroke();
        };
        Bubble.prototype.play = function () {
            var me = this;
            var isUp = true;
            game.play("light_" + this.x + "_" + this.y, function () {
                if (isUp) {
                    me.light += 3;
                }

                if (!isUp) {
                    me.light -= 3;
                }
                if (me.light >= 30) {
                    isUp = false;
                }
                if (me.light <= 10) {
                    isUp = true;
                }
            }, 50);
        };
        Bubble.prototype.stop = function () {
            //this.light = 10;
            var me = this;
            game.stop("light_" + this.x + "_" + this.y);
            game.play("restore_" + this.x + "_" + this.y, function () {
                if (me.light > 10) {
                    me.light--;
                }
                else {
                    me.light = 10;
                    game.stop("restore_" + me.x + "_" + me.y);
                }
            }, 50);
        };
        game.start();
}

export default game;