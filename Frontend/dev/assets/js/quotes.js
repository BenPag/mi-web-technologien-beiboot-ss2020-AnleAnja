const httpClient = require('axios').default;
import images from "./images";

const useDummyApi = true;
const apiBaseUrl = 'https://quotes.rest';
const errorQuote =  {
    author: '',
    background: '',
    category: '',
    date: new Date(),
    id: '',
    language: 'en',
    length: '15',
    permalink: '',
    quote: 'Quote was found',
    tags: ['error', 'dummy'],
    title: 'Error Quote'
};

async function getDummyApiResult() {
    await (new Promise(resolve => setTimeout(resolve, 500)));
    return {
        data: {
            'success': {
                'total': 1
            },
            'contents': {
                'quotes': [
                    {
                        'quote': 'I think it\'s very important to have a feedback loop, where you\'re constantly thinking about what you\'ve done and how you could be doing it better. I think that\'s the single best piece of advice: constantly think about how you could be doing things better and questioning yourself.',
                        'length': '280',
                        'author': 'Elon Musk',
                        'tags': [
                            'feedback',
                            'improve',
                            'inspire'
                        ],
                        'category': 'inspire',
                        'language': 'en',
                        'date': '2020-09-20',
                        'permalink': 'https://theysaidso.com/quote/elon-musk-i-think-its-very-important-to-have-a-feedback-loop-where-youre-constan',
                        'id': 'oMlzat5zCId3ZWOrVYiWCAeF',
                        'background': 'https://theysaidso.com/img/qod/qod-inspire.jpg',
                        'title': 'Inspiring Quote of the day'
                    }
                ]
            },
            'baseurl': 'https://theysaidso.com',
            'copyright': {
                'year': 2022,
                'url': 'https://theysaidso.com'
            }
        }
    };
}

function QuoteOfTheDay({contents, copyright}, image) {
    if(!Array.isArray(contents.quotes) || contents.quotes.length === 0) {
        return errorQuote;
    }

    const quoteOfDay =  Object.assign({}, contents.quotes[0], copyright);
    quoteOfDay.date = Date.parse(quoteOfDay.date);
    quoteOfDay.background = image;

    return quoteOfDay;
}

export default {
    getQuoteOfTheDay: async () => {
        const response = useDummyApi ?
            await getDummyApiResult() :
            await httpClient.get(`${apiBaseUrl}/qod`);

        const image = await images.getQuoteOfTheDayImage();
        return QuoteOfTheDay(response.data, image);
    }
};
