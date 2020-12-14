const gentseFeesten_API = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';

const API = {
    loadEvents(callback){
            fetch(gentseFeesten_API, {})
                .then(response => response.json())
                .then(json => callback(json))
                .catch((error) => console.error(error))   
        }
}

// API.loadEvents(events => {
//     console.log(events)
// })