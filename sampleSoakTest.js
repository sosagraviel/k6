/*
Soak testing is used to validate realiability of the system over a long time

Run a soak tes to:
- Verify that your system doesn't suffer from bugs or memory leaks, which result in a crash or restart after
- Verify that expected application restarts don't lose requests
- Find bugs related to race-conditions that appear sporadically
- Make sure your database doesn't exhaust tha allocated disk storage
- Make sure the external services you depended on don't stop working after a certain amount of requests are

How to run a soak rest:
- Determinate the maximum amount of users your system can handle.
- Get the 75-80% of that value.
- Set VUs to that value
- Run the test in 3 stages. Rump up to the VUs, stay there for 4-12 hours, rump down to 0
*/

import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duration: '2m', target: 400},// ramp up to 400 users
        {duration: '3h56m', target: 400},// stay at 400 for ~4 hours
        {duration: '2m', target: 0},// scale down. (optional)
    ],
};

const API_BASE_URL = 'https://reqres.in';
export default function () {
    http.batch([
        ['GET', `${API_BASE_URL}/api/users?page=2`],
        ['GET', `${API_BASE_URL}/api/users/2`],
        ['GET', `${API_BASE_URL}/api/unknown/2`],
    ]);
    sleep(1);
};