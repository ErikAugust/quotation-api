/**
 * The purpose of this script is to import quotes from a JSON file into the database via the REST API.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: axios } = require('axios');
const url = 'https://quotes-eaj.vercel.app';

void (async function () {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const quotes = require('./quotes').list;

  for (const quote of quotes) {
    try {
      await axios.post(url, {
        quote: quote.quote,
        attributed: quote.attributed,
        tags: [],
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
})();
