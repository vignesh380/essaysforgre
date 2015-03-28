var EssayPool = App.model('essayPoolModel');
var latestID = 0 ;

/**{app.routes.essayPoolRoutes.addToEssayPool
 * :[POST]} <br/> Method to add an essay topic to the essay_pool table
 * @exports addToEssayPool
 * @param {string} reqest 
 * @param {string} response 
 */
function addToEssayPool(req,res) {

	EssayPool.findOne({}).sort('-essaypool_id').exec(function (err, result) {
		
		if (err) {
			res.status(422).send('Problem: ' + err.message );
		} else {
			if(result){
			var essay = new EssayPool({
				essaypool_id: result.essaypool_id + 1,
				essay_type:req.body.essay_type,
				essay_topic:req.body.essay_topic
				});		
			} else { 
				var essay = new EssayPool({
				essaypool_id: 0,
				essay_type:req.body.essay_type,
				essay_topic:req.body.essay_topic
				});		
			} 
			essay.save(function(err) {
				if(err) {
					res.status(422).send('Problem: ' + err.message );
				} else {
					res.status(200).send('Added to the pool successfully :D <a href="/addEssayTopic">go back </a>');
				}
			});
	}
	});	
}

/**{app.routes.essayPoolRoutes.essayPoolPage
 * :[GET]} <br/><br/>  Method to render the essayPoolPage
 * @exports essayPoolPage
 * @param {object} reqest 
 * @param {object} response 
 */
function essayPoolPage(req,res){
    console.log("Node app got request to /addEssayTopic :");
  res.sendFile('addEssayTopic.html', { root: 'public' }); 

}

/**{app.routes.essayPoolRoutes.getEssayTopicFromPool
 * :[internal_method]}  <br/><br/> Method to get a random essay topic from the essay_pool table
 * @exports getEssayTopicFromPool
 * @param {string} essay Type {issue or argument} 
 * @param {function} callback after retrieving the essay topic
 */
function getEssayTopicFromPool(essay_type , callback) {
	EssayPool.findOneRandom({"essay_type" : essay_type} , function(error, result) {
		if(error) {
			res.status(422).send('Problem: ' + err.message );
		} else {
			callback(result); 
		}
	});
}

exports.add = addToEssayPool;
exports.essayPoolPage = essayPoolPage;
exports.getEssayTopicFromPool = getEssayTopicFromPool;
