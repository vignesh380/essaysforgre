var EssayModel = App.model('essay');

function getEssayForReview(callback) {
	EssayModel.findOneRandom({}, function(error, result) {
		if(error) {
			res.status(422).send('Problem: ' + err.message );
		} else {
			console.log("essay got :" + result.essay_content);
			callback(result); 
		}
	});
}

exports.getEssayForReview = getEssayForReview;

