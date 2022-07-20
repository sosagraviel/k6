/*
* Stress testing is a type of load testing used to determinate the limits of the system.
* The purpose of this test is to verify the stability and reliability under the extreme conditions
*
* Run the stress test to
* -Determinate how your system will behave under extreme conditions
* - Determine what is the maximum capacity of your system in terms of users or throughput
* - Determine the breaking point of your system and its failure mode
* - Determine if your system will recover without manual intervention after the stress test is over*/
import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duration: '2m', target: 100},// below normal load.
        {duration: '5m', target: 100},
        {duration: '2m', target: 200},// normal load.
        {duration: '5m', target: 200},
        {duration: '2m', target: 300},// around the breaking point.
        {duration: '5m', target: 300},
        {duration: '2m', target: 400},// beyond the breaking point.
        {duration: '5m', target: 400},
        {duration: '10m', target: 0},// scale down. Recovery Stage.
    ],
};

const API_BASE_URL = 'https://reqres.in';
export default () => {

    http.batch([
        ['GET', `${API_BASE_URL}/api/users?page=2`],
        ['GET', `${API_BASE_URL}/api/users/2`],
        ['GET', `${API_BASE_URL}/api/unknown/2`],
    ]);
    sleep(1);
};