import envConfig from '@/assets/js/env-options';

const envKey = `is${window.CTPrefConfig.env}`;
const domain = envConfig[envKey].domain;

const Interfaces = {
    testPost: `${domain}/api/test/post`,
    testGet: `${domain}/api/test/get`
};

export default Interfaces;
