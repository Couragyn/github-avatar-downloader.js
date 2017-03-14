var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');
// create main function to get contributors
function getRepoContributors(repoOwner, repoName, cb) {
  // Set token variables
  var GITHUB_USER = "Couragyn";
  var GITHUB_TOKEN = "8d2ffa29ebb42473e0d745e977add3fe0db859ff";
  // create request url
  var requestUrl = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`
  // set options for request
  var options = {
    url: requestUrl,
    headers: {
      'User-Agent': 'request'
    }
  };
  // create callback for results
  function callback(error, response, body) {
      //Check  error
      if(error){
          return console.log('Error:', error);
      }
      //Check success
      if(response.statusCode !== 200){
          return console.log('Invalid Status Code Returned:', response.statusCode);
      }
      //if good, print the body
      var parsed = JSON.parse(body);
      // only print if users are present
      if (parsed && parsed.length){
        for (user in parsed) {
          console.log(parsed[user].avatar_url);
        }
      }
  }
  // call request
  request(options, callback);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
