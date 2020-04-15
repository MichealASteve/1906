var obody = document.body || document.documentElement;
var est = document.getElementsByClassName('est_check')[0].getElementsByTagName('input')[0];
var est_check = 'checked';

for(var i in data){
	var model1 = document.createElement('div');
	model1.className = 'shop store'+data[i].id;
	model1.innerHTML = `<h5 class="storeName">${data[i].shopName}</h5>
		<p>全选 <input type="checkbox" class="all_ch${data[i].id}" checked="checked"></p>
		<ul class="title">
			<li>选择</li>
			<li>商品</li>
			<li>单价</li>
			<li>个数</li>
			<li>小结</li>
			<li>删除</li>
		</ul>`;
	obody.appendChild(model1);
	data[i].check = 'checked';
	data[i].t_all = function(){
		var t_i = this.id-1;
		var a = 0;
		var b = 0;
		for(var n in data[t_i].goods){
			if(data[t_i].goods[n].check){
				a+=data[t_i].goods[n].num;
				b+=data[t_i].goods[n].num*data[t_i].goods[n].money;
			}
		}
		return {"num":a,"price":b};
	}
	for(var n in data[i].goods){
		data[i].goods[n].check = 'checked';
		
		var model = document.createElement('ul');
		model.className = 'goods';
		model.innerHTML = `<li><input type="checkbox" checked='checked'></li>
				<li><img src=${data[i].goods[n].src} height="100" width="100" alt=""></li>
				<li>${data[i].goods[n].money}</li>
				<li><p><button>-</button><b class='num'>${data[i].goods[n].num}</b><button>+</button></p></li>
				<li class='self_all'>${data[i].goods[n].money}</li>
				<li><button class='del'>remove</button></li>`;
		var pa = document.getElementsByClassName('shop store'+data[i].goods[n].pid)[0];
		pa.appendChild(model);
	}
}

var all_num = document.getElementsByClassName('all')[0].getElementsByTagName('b')[0];
var all_price = document.getElementsByClassName('all')[0].getElementsByTagName('span')[0];

function o_all(mm){
	var a = 0;
	var b = 0;
	for(var i = 0;i < data.length;i++){
		if(mm){
			if(mm.indexOf(''+i) != -1){
				continue;
			}else{
				var s = data[i].t_all();
				a+=s.num;
				b+=s.price;
			}
		}else{
			var s = data[i].t_all();
			a+=s.num;
			b+=s.price;
		}
	}
	all_num.innerHTML = a;
	all_price.innerHTML = b;
}
o_all();

var mid = [1,2,3];
for(var i in mid){
	var str = '';
	var bbb = document.getElementsByClassName('all_ch'+mid[i])[0];
	bbb.index = i;
	bbb.onclick = function(){
		i = this.index;
		if(!this.checked){
			str+=i;
			data[i].check = '';
			str = only(str);
			o_all(str);
			if(str.length == 0){
				est_check = 'checked';
				est.checked = 'checked';
			}else{
				est.checked = '';
				est_check = '';
			}
		}else{
			data[i].check = 'checked';
			str = only(str);
			var arr = str.split('');
			arr.splice(str.indexOf(''+i),1);
			str = arr.join('');
			o_all(str);
			if(str.length == 0){
				est_check = 'checked';
				est.checked = 'checked';
			}else{
				est.checked = '';
				est_check = '';
			}
		}
		
	}
}

est.onclick = function(){
	if(est_check){
		est_check = '';
		for(var i in data){
			data[i].check = '';
			document.getElementsByClassName(`all_ch${data[i].id}`)[0].checked = '';
		}
		o_all('012');
	}else{
		est_check = 'checked';
		for(var i in data){
			data[i].check = 'checked';
			document.getElementsByClassName(`all_ch${data[i].id}`)[0].checked = 'checked';
			o_all('');
		}
	}
}

function only(str){
	var arr = str.split('');
	var obj = {};
	for(var i in arr){
		obj[arr[i]] = '';
	}
	var a = '';
	for(var i in obj){
		a+=i;
	}
	return a;
}





function once(){
	var goods = document.getElementsByClassName('goods');
	
	var mate = {};
	for(var i = 0;i < goods.length;i++){
		var s = goods[i].parentNode.className.slice(-1);
		if(mate[s]){
			mate[s].push(goods[i]);
		}else{
			mate[s] = [goods[i]];
		}
	}
	for(var i in mate){
		for(var n in mate[i]){
			
			mate[i][n].index = [i,n];
			mate[i][n].onclick = function(ev){
				var n = this.index[1];
				var i = this.index[0];
				var ent = ev || event;
				var boss = ent.target || ent.srcElement;
				
				var num = this.getElementsByClassName('num')[0];
				var self_all = this.getElementsByClassName('self_all')[0];
				if(boss.innerHTML == '-'){
					if(data[i-1].goods[n].num > 0){
						data[i-1].goods[n].num--;
						num.innerHTML--;
						self_all.innerHTML -= data[i-1].goods[n].money;
						o_all();
					}
				}
				if(boss.innerHTML == '+'){
					data[i-1].goods[n].num++;
					num.innerHTML++;
					self_all.innerHTML = self_all.innerHTML -1+1 +data[i-1].goods[n].money;
					o_all();
				}
				if(boss.nodeName == 'INPUT'){
					if(data[i-1].goods[n].check){
						data[i-1].goods[n].check = '';
						data[i-1].check = '';
						document.getElementsByClassName(`all_ch${i}`)[0].checked = '';
					}else{
						data[i-1].goods[n].check = 'checked';
						var sss = 0;
						for(var ss in data[i-1].goods){
							if(data[i-1].goods[ss].check){
								sss++;
							}
						}
						if(sss == data[i-1].goods.length){
							document.getElementsByClassName(`all_ch${i}`)[0].checked = 'checked';
						}
						
					}
					o_all();
				}
				if(boss.innerHTML == 'remove'){
					document.getElementsByClassName('store'+i)[0].removeChild(this);
					data[i-1].goods.splice(n,1);
					o_all();
					once();
				}
			}
		}
	}
}
once();


