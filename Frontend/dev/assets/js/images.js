import config from './config';
const httpClient = require('axios').default;

const apiBaseUrl = config.imagesApiUrl;

export default {
    getQuoteOfTheDayImage: async () => {
        const response = await httpClient.get(`${apiBaseUrl}/random`);
        return response.data;
    }
};
