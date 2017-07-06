//UNSCRAMBLE题型的导入和返回
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/learningUser");
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
//指定数据库的格式，对应的字段名和类型
var schema = new Schema({
	_id: Number,
    _set: Number,
    comment: String,
    question: Number,
    speaker_1: String,
    language_1: String,
    top: String,
    bottom: String,
    font_1: String,
    speaker_2: String,
    language_2: String,
    U1: String,
    U2: String,
    U3: String,
    U4: String,
    U5: String,
    U6: String,
    U7: String,
    U8: String,
    U9: String,
    font_2: String
});

var USBModel = mongoose.model('unscramble', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/UNSCRAMBLE.xlsx");
var data = obj[0].data;
var obj_sound = xlsx.parse(name + "/app/excel/F1_0000.xlsx");
var data_sound = obj[0].data;
var i = 1;

exports.init = function(req, res) {
	var set_tmp = 1;
	while (i < data.length && data[i][2] != undefined) {
		//表格格式处理
		if (data[i][0] != undefined) {
			if (data[i][0] != set_tmp)
				set_tmp = data[i][0];
		}
		var _set = set_tmp;
		var comment = data[i][1];
		var question = data[i][2];
		var sound_1 = data[i][3];
		var language_1 = data[i][4];
		var top = data[i][5];
		var bottom = data[i][6];
		var font_1 = data[i][7];
		var sound_2 = data[i][8];
		var language_2 = data[i][9];
		
		var usb = new USBModel({
			_id: i,
		    _set: _set,
		    comment: data[i][1],
		    question: data[i][2],
		    speaker_1: data[i][7],
		    language_1: data[i][6],
		    top: data[i][3],
		    bottom: data[i][4],
		    font_1: data[i][5],
		    speaker_2: data[i][19],
		    language_2: data[i][18],
		    U1: data[i][8],
		    U2: data[i][9],
		    U3: data[i][10],
		    U4: data[i][11],
		    U5: data[i][12],
		    U6: data[i][13],
		    U7: data[i][14],
		    U8: data[i][15],
		    U9: data[i][16],
		    font_2: data[i][17] 
		});
		usb.save();
		i++;
	}
	res.redirect("/");
	
};

exports.del = function(req, res) {
	i = 1;
	while (i < data.length) {
		var cond = {language_1: data[i][6]};
		USBModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	//USBModel.find().sort({'_id': 1}).exec(function(err, list) {
	//	var set = 1;
	//	var result = [];
	//	//console.log(list);
	//	//首先将数据按照set值来分组
	//	for (var i = 0; i < list.length;) {
	//		var set_tmp = [];
	//		while (i < list.length && list[i]._set == set) {
	//			list[i].question += 1;
	//			set_tmp.push(list[i]);
	//			i++;
	//			//console.log(i);
	//		}
	//		set++;
	//		result.push(set_tmp);
	//	}
	//	//需要获得应该返回的数值
	//
	//});

	var unit = req.query.unit;
	var tour = req.query.tour;
	var set = req.query.set;
	if (req.cookies.account != null) {
		//var userModel = mongoose.model('Users');
		//userModel.update({username: req.cookies.account.username}, {
		//	$set: {current_unit: unit, current_tour: tour, current_type: 'letter_number_match'}
		//}, function(err) {
		//	if (err) {
		//		console.log(err);
		//		return
		//	}
		////});
		////console.log(result[set]);
		//console.log(data);
		//res.render("unscramble.jade", {title: "unscramble", audios: result[set]});

		var set_tmp = 1;
		var result = [];
		i = 1;
		var id = 1;
		while (i < data.length && data[i][2] != undefined) {
			//表格格式处理
			if (data[i][0] != undefined) {
				if (data[i][0] != set_tmp)
					set_tmp = data[i][0];
			}
			if (set_tmp != set)
			{
				i++;
				continue;
			}
			else
			{
				var _set = set_tmp;
				var strs = data[i][20].split(":");
				var start = 0;
				for(var j=0;j<strs.length-1;j++)
				{
					start = start*60 + parseInt(strs[j],10);
				}
				start = start*1000 + parseInt(strs[j],10);

				strs = data[i][21].split(":");
				var stop = 0;
				for(var j=0;j<strs.length-1;j++)
				{
					stop = stop*60 + parseInt(strs[j],10);
				}
				stop = stop*1000 + parseInt(strs[j],10);

				var temp = {
					_id: id,
					_set: _set,
					comment: data[i][1],
					question: data[i][2]+1,
					speaker_1: data[i][7],
					language_1: data[i][6],
					top: data[i][3],
					bottom: data[i][4],
					font_1: data[i][5],
					speaker_2: data[i][19],
					language_2: data[i][18],
					U1: data[i][8],
					U2: data[i][9],
					U3: data[i][10],
					U4: data[i][11],
					U5: data[i][12],
					U6: data[i][13],
					U7: data[i][14],
					U8: data[i][15],
					U9: data[i][16],
					font_2: data[i][17],
					start_time : start,
					stop_time : stop,
				};
				result.push(temp);
				id++;
			}
			i++;
		}
		console.log(result);
		res.render("unscramble.jade", {title: "unscramble", audios: result});
	}
	else
		res.redirect('/login');
};