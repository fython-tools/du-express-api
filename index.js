const ExpressApi = require('./src/api');

async function main(num) {
    const api = new ExpressApi();
    const tokenV2 = await api.init();
    console.log(`TokenV2: ${tokenV2}`);
    const result = await api.get(num);
    console.log(JSON.stringify(result, null, 2));
}

if (process.argv.length < 3) {
    console.log('Please specify a package number to query. For example: "node ./index.js 123456789012"');
    return;
}
main(process.argv[2]);
