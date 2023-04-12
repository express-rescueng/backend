import http from 'http';

http.get('http://icanhazip.com/', function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
        console.log('My public IP address is:', data.trim());
    });
});
