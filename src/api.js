const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

const GET_TOKEN_URL = 'https://www.baidu.com/baidu?isource=infinity&iname=baidu&itype=web&tn=02003390_42_hao_pg&ie=utf-8&wd=%E5%BF%AB%E9%80%92';
const TOKEN_PATTERN = /tokenV2=(.*?)"/;
const GET_EXPRESS_URL = 'https://express.baidu.com/express/api/express';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36';

class ExpressApi {
    constructor({ cookie, tokenV2 } = {}) {
        this.tokenV2 = tokenV2;
        this.axios = axios.create({
            withCredentials: true,
            headers: {
                'User-Agent': BROWSER_UA,
            }
        });
        axiosCookieJarSupport(this.axios);
        this.axios.defaults.jar = new tough.CookieJar();
        if (cookie) {
            this.axios.defaults.headers.common['Cookie'] = cookie;
        }
    }

    async init() {
        const res = await this.axios.get(GET_TOKEN_URL);
        if (res.status !== 200) {
            throw new Error('Cannot get token by du search pages');
        }
        const pageData = res.data;
        const regRes = TOKEN_PATTERN.exec(pageData);
        if (regRes.length <= 0) {
            throw new Error('Cannot find token from response data');
        }
        this.tokenV2 = regRes[1];
        return this.tokenV2;
    }

    async get(num, { company } = {}) {
        const opts = {
            params: {
                tokenV2: this.tokenV2,
                appid: 4001,
                nu: num,
            },
        };
        if (company) {
            opts.params.com = company;
        }
        const res = await this.axios.get(GET_EXPRESS_URL, opts);
        return res.data;
    }
}

module.exports = ExpressApi;