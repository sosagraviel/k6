import http from 'k6/http';
import {sleep} from 'k6';
import {Rate} from 'k6/metrics';
import {check} from 'k6';

const failures = new Rate('filed request');

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 10,
    duration: '5s',
    threshold: {
        filed_requests: ['rate<=0'],
        http_req_duration: ['p(95)<500']
    }
}


export default function () {
    const result = http.get('https://reqres.in/api/users?page=2')
    check(result, {
        'http status code was 200': r => r.result === 200,
    });
    failures.add( result.status === 200);
};