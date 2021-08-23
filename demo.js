/*   const https=require('https');


    const data= https.request('https://jsonmock.hackerrank.com/api/football_matches?year=2011&page=2');
    console.log(data.json); */




var https = require('https');

/* var options = {
    host: 'google.com',
    path: '/'
} */
var request = await https.request('https://jsonmock.hackerrank.com/api/football_matches?year=2011&team1goals=2&team2goals=2&page=2', function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log(JSON.parse(data));
        const detail=JSON.parse(data);
        numOfPage=detail.total_pages;
        

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();
