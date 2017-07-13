var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var xlsx = require('node-xlsx');
var fs = require('fs');


exports.open = function(req, res, next) {
// write
	//获得要下载的类型
	var type = req.body.select;
	var data;
	//if (req.body.select == 'interactive')
	switch(type) {
		//根据类型来指定列的名字
		case "narra":
			data = [['Set', 'Random order?', 'Slide', 'Review?', 'Q=ti,A=v', 'Q=tv,A=i', 'Q=iv,A=t', 'Q=v,A=ti', 'Q=i,A=tv',
				'Q=t,A=iv', 'Q=t,A=i', 'Q=t,A=v', 'Q=v,A=t', 'Q=v,A=i',	'Q=i,A=t', 'Q=i,A=v', 'Image filename', 
				'Multiple choice?', 'Auto-play?', 'Disable audio prompt?', 'Enable emphasis?']];
			break;
		case "agbb":
			data = [['Set',	'Comment', 'Question', 'A', 'A_font', 'Language', 'Speaker', 'B', 'B alternative I', 'B alternative II',
			 	'B alternative III', 'B_font',	'Language',	'Speaker']];
			var aggbModel = mongoose.model('a_given_b_blank');
			//读出数据库里的值，写到对应的列里
			aggbModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].top, list[i].a_font, list[i].a_language, list[i].a_speaker,
						list[i].bottom, list[i].bottom_1, list[i].bottom_2, list[i].bottom_3, list[i].b_font, list[i].b_language, list[i].b_speaker);
					data.push(tmp);
				}
				//将数据写入文件中
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./A_GIVEN_B_BLANK.xlsx', buffer, 'binary');
                down('./A_GIVEN_B_BLANK.xlsx','A_GIVEN_B_BLANK.xlsx');
                fs.unlinkSync('./A_GIVEN_B_BLANK.xlsx');
			});
			break;
		case "agbc":
			data = [['Set',	'Comment', 'Question', 'A', 'A_font', 'Language', 'Speaker', 'B', 'B alternative I', 'B alternative II', 'B_font',
				'Language', 'Speaker']];
			var agbcModel = mongoose.model('a_given_b_cloze');
			agbcModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].top, list[i].a_font, list[i].a_language, list[i].a_speaker,
						list[i].bottom, list[i].alternative_1, list[i].alternative_2, list[i].b_font, list[i].b_language, list[i].b_speaker);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./A_GIVEN_B_CLOZE.xlsx', buffer, 'binary');
                down('./A_GIVEN_B_CLOZE.xlsx','A_GIVEN_B_CLOZE.xlsx');
                fs.unlinkSync('./A_GIVEN_B_CLOZE.xlsx');
			});
			break;
		case "acbg":
			data = [['Set',	'Comment', 'Question', 'A',	'A alternative I', 'A alternative II', 'A_font', 'Language', 'Speaker', 'B', 'B_font',
				'Language',	'Speaker']];
			var acbgModel = mongoose.model('a_cloze_b_given');
			acbgModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].top, list[i].alternative_1, list[i].alternative_2, 
						list[i].a_font, list[i].a_language, list[i].a_speaker, list[i].bottom, list[i].b_font, list[i].b_language, list[i].b_speaker);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./A_CLOZE_B_GIVEN.xlsx', buffer, 'binary');
                down('./A_CLOZE_B_GIVEN.xlsx','A_CLOZE_B_GIVEN.xlsx');
                fs.unlinkSync('./A_CLOZE_B_GIVEN.xlsx');
			});
			break;
		case "unscr":
			data = [['Set',	'Comment', 'Question', 'TOP', 'BOTTOM',	'1_font', 'Language', 'Speaker', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6',
				'U7', 'U8', 'U9', '2_font',	'Language', 'Speaker']];
			var uscModel = mongoose.model('unscramble');
			uscModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].top, list[i].bottom, list[i].font_1, 
						list[i].language_1, list[i].speaker_1, list[i].U1, list[i].U2, list[i].U3, list[i].U4,
						list[i].U5, list[i].U6, list[i].U7, list[i].U8, list[i].U9, list[i].font_2, list[i].language_2, list[i].speaker_2);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./UNSCRAMBLE.xlsx', buffer, 'binary');
                down('./UNSCRAMBLE.xlsx','UNSCRAMBLE.xlsx');
                fs.unlinkSync('./UNSCRAMBLE.xlsx');
			});
			break;
		case "l_n_m":
			data = [['Set',	'Comment', 'Question', 'A',	'A_font', 'Language', 'Speaker', 'B', 'B_font',	'C', 'C_font', 'Language', 
				'Speaker']];
			var lnmModel = mongoose.model('letter_number_match');
			lnmModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].part_a, list[i].font_a, list[i].language_a, list[i].speaker_a, 
						list[i].part_b, list[i].font_b, list[i].part_c, list[i].font_c, list[i].language_b, list[i].speaker_b);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./LETTER_NUMBER_MATCH.xlsx', buffer, 'binary');
                down('./LETTER_NUMBER_MATCH.xlsx','LETTER_NUMBER_MATCH.xlsx');
                fs.unlinkSync('./LETTER_NUMBER_MATCH.xlsx');
			});
			break;
		case "multichoice":
			data = [['Set',	'Comment', 'Question', 'MAIN SENTENCE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'A_font', 'Language',
				'Speaker']];
			var mulModel = mongoose.model('multiple_choice');
			mulModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].main_sentence, list[i].blank_1_h1, list[i].blank_1_h2, list[i].blank_1_h3, list[i].blank_1_h4, list[i].blank_1_h5, list[i].blank_1_h6, 
						list[i].a_font, list[i].speaker, list[i].language, list[i].blank_2_h1, list[i].blank_2_h2, list[i].blank_2_h3, list[i].blank_2_h4, list[i].blank_2_h5, list[i].blank_2_h6);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./MULTIPLE_CHOICE.xlsx', buffer, 'binary');
                down('./MULTIPLE_CHOICE.xlsx','MULTIPLE_CHOICE.xlsx');
                fs.unlinkSync('./MULTIPLE_CHOICE.xlsx');
			});
			break;
		case "muc":
			data = [['Set', 'Comment', 'Question', 'GIVEN', '1_font', 'Language', 'Speaker', 'DESIRED', 'PIECE-01', 'PIECE-02',	'PIECE-03',
				'PIECE-04',	'PIECE-05',	'PIECE-06',	'PIECE-07', 'PIECE-08', '2_font', 'Language', 'Speaker']];
			var mucModel = mongoose.model('matchupclick');
			mucModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].given, list[i].font_1, list[i].language_1, list[i].speaker_1, 
						list[i].desired, list[i].p1, list[i].p2, list[i].p3, list[i].p4,
						list[i].p5, list[i].p6, list[i].p7, list[i].p8, list[i].font_2, list[i].language_2, list[i].sound_2);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('./MATCHUPCLICK.xlsx', buffer, 'binary');
                down('./MATCHUPCLICK.xlsx','MATCHUPCLICK.xlsx');
                fs.unlinkSync('./MATCHUPCLICK.xlsx');
			});
			break;
		case "user":
			data = [['username', 'Email', 'Phone', 'Current_tour', 'Current_lesson']];
			var userModel = mongoose.model('Users');
			userModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i].username, list[i].email, list[i].phone, list[i].Current_lesson, list[i].Current_tour);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				//fs.writeFileSync('./Users.xlsx', buffer, 'binary');
                fs.writeFileSync('./Users.xlsx', buffer, 'binary');
                down('./Users.xlsx','Users.xlsx');
                fs.unlinkSync('./Users.xlsx');
			});
			break;
	}
    function down(filePath,fileName){
        var stats = fs.statSync(filePath);
        if(stats.isFile()){
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename='+fileName
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.send('export fail!');
        }
	}


};

exports.upload = function(req, res) {
	if(!/multipart\/form-data/i.test(req.headers['content-type'])){
		return res.end('wrong');
	}
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        //存储文件在服务器中，再直接访问导入数据的路径，这样导入时读取的是新文件而不是旧文件
        file.pipe(fs.createWriteStream('../app/excel/' + filename));
        file.on('end', function () {
            if (filename == 'A_GIVEN_B_CLOZE.xlsx') {
                var agbcModel = mongoose.model('a_given_b_cloze');
                agbcModel.remove({}, function (err) {
                    res.redirect('/init_agbc');
                });
            }
            else if (filename == 'A_GIVEN_B_BLANK.xlsx') {
            	console.log("update the database");
                var agbbModel = mongoose.model('a_given_b_blank');
                agbbModel.remove({}, function (err) {
                    console.log("remove the docs");
                    res.redirect('/init_aggb');
                });
            }
            else if (filename == 'UNSCRAMBLE.xlsx') {
                var usc = mongoose.model('unscramble');
                usc.remove({}, function (err) {
                    res.redirect('/init');
                });
            }
            else if (filename == 'A_CLOZE_B_GIVEN.xlsx') {
                var acbg = mongoose.model('a_cloze_b_given');
                acbg.remove({}, function (err) {
                    res.redirect('/init_acbg');
                });
            }
            else if (filename == 'MATCHUPCLICK.xlsx') {
                var muc = mongoose.model('matchupclick');
                muc.remove({}, function (err) {
                    res.redirect('/init_muc');
                });
            }
            else if (filename == 'LETTER_NUMBER_MATCH.xlsx') {
                var lnm = mongoose.model('letter_number_match');
                lnm.remove({}, function (err) {
                    res.redirect('/init_letter');
                });
            }
            else if (filename == 'MULTIPLE_CHOICE.xlsx') {
                var mc = mongoose.model('multiple_choice');
                mc.remove({}, function () {
                    res.redirect('/init_mc');
                })
            }
        });
    });

    req.pipe(req.busboy);
} 
