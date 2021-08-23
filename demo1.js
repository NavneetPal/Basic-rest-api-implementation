const https=require('https');


async function getNumDraws(year) {
    let total=10;
    let count=0;
    for(let i=1;i<=10;i++){
 var request = https.request(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}& team1goals=2&team2goals=2&page=${i}`, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        const detail=JSON.parse(data);
        count+=detail.data.length;
    });
})
 
}
console.log(count);
}

getNumDraws(2011);