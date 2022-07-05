export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 1,
    duration: '5s'
};


export default function () {
    http.get('https://reqres.in/api/users?page=2')
    sleep(1);
};