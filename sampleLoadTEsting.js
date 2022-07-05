/*
Load Testing is primarily concerned with assessing the current performance of your system in terms of concurrent users or requests per second.
When you want to understand if your system is meeting the performance goals, this is the type of test you will run.

Run a load test to:
- Access the current performance os your system under typical and peak load.
- Make sure you are continuously meeting the performance standards as you make changes to your system.

Can be used to simulate a normal day in your business.
*/
import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duration: '5m', target: 100},// simulate ramp-up of traffic rom 1 to 100 user over 5 minutes
        {duration: '15m', target: 100},// stay at 100 user for 15 minutes
        {duration: '5m', target: 0},// ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'],// 99% of request must complete below 150ms
    },
};

const API_BASE_URL = 'https://reqres.in/api/users?page=2';
export default () => {
    let response = http.get(`${API_BASE_URL}`);
    sleep(1);
};