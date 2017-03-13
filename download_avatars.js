var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "Couragyn";
  var GITHUB_TOKEN = "8d2ffa29ebb42473e0d745e977add3fe0db859ff";

  var requestUrl = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  console.log(requestUrl);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


// var link = 'https://api.github.com/repos/jquery/jquery/contributors';
// GET /repos/:owner/:repo/contributors