var shop = document.getElementsByClassName('shop')[0];
var all_num = document.getElementsByClassName('all')[0].getElementsByTagName('b')[0];
var all_price = document.getElementsByClassName('all')[0].getElementsByTagName('span')[0];

for(var i in data){
	var model1 = document.createElement('ul');
	model1.className = 'goods';
	model1.innerHTML = `<li><input type="checkbox" checked='checked'></li>
			<li><img src=${data[i].src} height="100" width="100" alt=""></li>
			<li>${data[i].self}</li>
			<li><p><button>-</button><b class='num'>${data[i].num}</b><button>+</button></p></li>
			<li class='self_all'>${data[i].self_all}</li>
			<li><button class='del'>remove</button></li>`;
	shop.appendChild(model1);
}
var all_arr = add_all();
all_num.innerHTML = all_arr[0];
all_price.innerHTML = all_arr[1];

var all_ch1 = document.getElementsByClassName('all_ch')[0];
all_ch1.onclick = function () {
	if (!all_ch1.checked) {
		for(var i in data){
			data[i].check = '';
			document.getElementsByTagName('input')[i-1+2].checked = '';
		}
		all_num.innerHTML = 0;
		all_price.innerHTML = 0;
		all_ch1.checked = '';
	}else{
		for(var i in data){
			data[i].check = 'checked';
			document.getElementsByTagName('input')[i-1+2].checked = 'checked';
		}
		all_arr = add_all();
		all_num.innerHTML = all_arr[0];
		all_price.innerHTML = all_arr[1];
		all_ch1.checked = 'checked';
	}
}

var goods = document.getElementsByClassName('goods');
for(var n in goods){
	goods[n].onclick = function(ev){
		for(var i in data){
			if (this.getElementsByTagName('img')[0].src.slice(-data[i].src.length) == data[i].src) {
				this.index = i;
			}
		}
		var ent = ev || event;
		var boss = ent.srcElement || ent.target;
		if (boss.nodeName == 'INPUT') {
			if (!boss.checked) {
				boss.checked = '';
				all_num.innerHTML -= data[this.index].num;
				all_price.innerHTML -= data[this.index].self_all;
				all_ch1.checked = '';
				data[this.index].check = '';
			}else{
				boss.checked = 'checked';
				all_num.innerHTML = Number(all_num.innerHTML) + data[this.index].num;
				all_price.innerHTML = Number(all_price.innerHTML) + data[this.index].self_all;
				data[this.index].check = 'checked';
				one();
				all_ch1.checked = all_ch;
			}
		}
		if (boss.nodeName == 'BUTTON') {
			if (boss.innerHTML == '+') {
				add.call(data[this.index]);
				document.getElementsByClassName('num')[this.index].innerHTML = data[this.index].num;
				document.getElementsByClassName('self_all')[this.index].innerHTML = data[this.index].self_all;
	 			all_arr = add_all();
	 			if (data[this.index].check) {
	 				all_num.innerHTML = all_arr[0];
					all_price.innerHTML = all_arr[1];
	 			}
			}else{
				down.call(data[this.index]);
				document.getElementsByClassName('num')[this.index].innerHTML = data[this.index].num;
				document.getElementsByClassName('self_all')[this.index].innerHTML = data[this.index].self_all;
	 			all_arr = add_all();
	 			if (data[this.index].check) {
	 				all_num.innerHTML = all_arr[0];
					all_price.innerHTML = all_arr[1];
	 			}
			}
			if (boss.innerHTML == 'remove') {
				data.splice(this.index,1);
				shop.removeChild(this);
				all_arr = add_all();
				all_num.innerHTML = all_arr[0];
				all_price.innerHTML = all_arr[1];
			}
		}
	}
}

