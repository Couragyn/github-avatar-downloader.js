var request = require('request');
var fs = require('fs');

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
          // creats path for avatar files
          var path = 'avatars/'+ parsed[user].login;
          // calls function to pipe image
          downloadImageByURL(parsed[user].avatar_url, path)
        }
      }
  }
  // call request
  request(options, callback);
}

// function to pip the image into a seperate folder
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
  .on('response', function (response) {
    console.log('Downloading image...');
    console.log('Response Message: ' + response.statusMessage);
    console.log('Content type: ' + response.headers['content-type']);
    console.log('Download complete.');
  })
    .pipe(fs.createWriteStream(filePath));
}

// Takes in user query
var query = process.argv;

// runs the getRepoContributors function
if (query.length === 4){
  getRepoContributors(query[2], query[3], function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
}
// If there are not two arguments, it will error our
else {
  console.log("Enter exactly two strings for repo owner and name");
}