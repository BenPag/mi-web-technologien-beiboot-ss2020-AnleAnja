const httpClient = require('axios').default;

const apiBaseUrl = 'http://localhost:3000';

export default {
    getQuoteOfTheDayImage: async () => {
        const response = await httpClient.get(`${apiBaseUrl}/random`);
        return response.data;
    }
};
