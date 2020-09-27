import config from '../config';
const httpClient = require('axios').default;

const apiBaseUrl = config.imagesApiUrl;

export default {
    getQuoteOfTheDayImage: async () => {
        const response = await httpClient.get(`${apiBaseUrl}/random`);
        const data = response.data;
        data.path = data.path.replace('http://localhost:3000', apiBaseUrl);
        return data;
    }
};
