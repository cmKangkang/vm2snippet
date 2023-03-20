const axios = require('axios');

module.exports = (async function main() {
  try {
    const url = 'https://baidu.com';
    const res = await axios({ url });
    console.log(res)
    return res
  } catch (error) {
    console.log("【error】", error)
    return "error result"
  }
})()