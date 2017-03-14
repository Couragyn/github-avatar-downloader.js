var request = require('request');




console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "Couragyn";
  var GITHUB_TOKEN = "8d2ffa29ebb42473e0d745e977add3fe0db859ff";

  var requestUrl = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`

  var options = {
    url: requestUrl,
    headers: {
      'User-Agent': 'request'
    }
  };


  function callback(error, response, body) {
      //Check for error
      if(error){
          return console.log('Error:', error);
      }

      //Check for right status code
      if(response.statusCode !== 200){
          return console.log('Invalid Status Code Returned:', response.statusCode);
      }

      //All is good. Print the body
      var parsed = JSON.parse(body);


  }
  request(options, callback);

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
