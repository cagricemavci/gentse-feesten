const gentseFeesten_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const news_API = 'https://www.pgm.gent/data/gentsefeesten/news.json';

const API = {
        loadEvents(callback) {
                fetch(gentseFeesten_API, {})
                        .then(response => response.json())
                        .then(json => callback(json))
                        .catch((error) => console.error(error))
        },
        loadNews(callback) {
                fetch(news_API, {})
                        .then(response => response.json())
                        .then(json => callback(json))
                        .catch((error) => console.error(error))
        }
}

// API.loadEvents(events => {
//     console.log(events)
// })