var data = [
	{
		"num":1,
		"src":"img/1.jpg",
		"self":100,
		"self_all":100,
		"check":"checked"
	},
	{
		"num":1,
		"src":"img/2.jpg",
		"self":200,
		"self_all":200,
		"check":"checked"
	},
	{
		"num":1,
		"src":"img/3.jpg",
		"self":300,
		"self_all":300,
		"check":"checked"
	}
];

var all_ch = 'checked';

function one(){
	var n = 0;
	for(var i in data){
		if (data[i].check) {
			n++;
		}
	}
	if (n == data.length) {
		all_ch = 'checked';
	}else{
		all_ch = '';
	}
}

function add(){
	this.num++;
	this.self_all = this.num*this.self;
}

function down(){
	if (this.num>0) {
		this.num--;
		this.self_all = this.num*this.self;
	}
}

function add_all(){
	var a = 0;
	var b = 0;
	for(var i in data){
		if (data[i].check) {
			b+=data[i].self_all;
			a+=data[i].num;
		}
	}
	return [a,b];
}

