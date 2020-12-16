(() => {
    const app = {
        initialize() {
            //run the fetch API to get events data
            this.loadEvents();

            //cache some elements
            this.cacheElements();
            //add eventlisteners to elements
            this.eventListeners();

        },
        //FUNCTIONS ONLY ***AFTER*** FETCH IS COMPLETED
        getDays() {
            //dynamic listing of days. get the days of the events and push them uniquely to an array
            console.log('dynamic listing of days has started...')
            console.log('example of an event: ', this.events[0]);
            this.days = []; //array of objects to be used such as full date, day of week, etc..
            let count = []; //check so that only unique days are being pushed to 'this.days' array
            this.events.forEach(event => {
                if (count.indexOf(event.day) === -1) {
                    let day = {
                        dayNum: event.day,
                        dayName: event.day_of_week,
                        month: 'Jul'
                    }
                    this.days.push(day)
                    count.push(event.day)
                }
            })

            //sort the days so it is chronological
            this.days.sort((subfunctions.compareDay)) //subfunctions.js --> { subfunctions }

            //use the generated days to populate the html page
            this.populateDays();
        },
        populateDays() {
            console.log('populating navigation days is started...')
            //first populate the days in the filter-bar
            let $programDays = document.querySelector('.days')

            if($programDays !== null) {
                 $programDays.innerHTML = this.days.map((day) => {
                return `
                <li id="${day.dayNum}">
                    <a href="detail.html?day=${day.dayNum}">
                        <span class="day--text">${day.dayName.slice(0,2)}</span>
                        <span class="day--num">${day.dayNum} ${day.month}</span>
                    </a>
                </li>
                `
                }).join('');
            } else{
                console.log('populating navigation on the filter bar is failed!')
            }

            //secondly populate the days in the hamburger menu list
            let $navProgramDays = document.querySelector('.nav__program-items')
            if($navProgramDays !== null){
                  $navProgramDays.innerHTML = this.days.map((day) => {
                return `
                <li><a href="detail.html?day=${day.dayNum}">${day.dayName} ${day.dayNum} ${day.month}</a></li>`
            }).join('')
            } else{
                console.log('populating days in hamburger menu list is failed!')
            }
          
        },
        getRandomEventCard(){
            console.log('getting random events has started...')
            let $randomCard = document.querySelector('.random__cards')

            if ($randomCard !== null) {
                let str = "";
                for (let i = 0; i < 3; i++) {
                    let randomEvent = this.events[subfunctions.generateRandomNum(this.events.length)]; //load three different -random- events from the events data
                    console.log(randomEvent)
                    str += `
                    <li class="random__card">
                    <a href="detail.html?day=${randomEvent.day}&slug=${randomEvent.slug}">
                        <div class="random-card__top">
                            <img src="${randomEvent.image !== null ? randomEvent.image.thumb : 'static/media/images/me_gusta.jpg'}" alt="${randomEvent.slug}">
                        </div>
                        <div class="random-card__bottom">
                            <time datetime="2019-07-17">${randomEvent.day_of_week.slice(0,2)} ${randomEvent.day} Jul ${randomEvent.start} u.</time>
                            <h3>${randomEvent.title}</h3>
                            <p>${randomEvent.location}</p>
                        </div>
                    </a>
                </li>`
                    
                }

                $randomCard.innerHTML = str;
            } else{
                console.log('randomcard container to populate has not been found!')
            }

           
            
        },
        createDetailPage(){
            //check if this is the detail page
            let url = window.location.pathname.includes('/detail.html');//path can be --/detail.html-- OR --C:\\users\\name\\..\\detail.html--
            let slug, day = ""; //matching parameters
            let event = new Object; //the details of this 'soon to be filled'-eventObj need to be shown
            if(url !== -1){
                console.log('page is detail page, populating detail page is started...')
                //find the correct event + correct day
                url = window.location.search;
                slug = new URLSearchParams(url).get('slug')
                day = new URLSearchParams(url).get('day')
                
                event = this.events.filter(event => event.slug == slug && event.day == day)[0] //filter function to find the correct event, filter gives an array -> array[0]
                console.log('populating detail with following event: ', event)
                //highlight the day in the days list
                let daysList = document.querySelectorAll('.days li')
                console.log('highlight the selected day using following daysList: ', daysList)
                daysList.forEach(y => {
                    if(y.id == day) {
                        y.classList.add('current');
                        y.focus();
                    }
                });
                

                //add event details on the page
                this.populateDetailPage(event); //found event as parameter to populate the event

            } else {
                console.log('not on detail page! on the following page: ', url)
            }
            
           
           
        },
        populateDetailPage(event) {
            console.log('adding event details on the details page started...');

            //detail__media is being populated
            console.log('   detail__media is being populated...')
            let str = `
            <img src="${event.image.thumb !== null ? event.image.thumb : 'static/media/images/me_gusta.jpg'}"
                    alt="${event.title}">
                <iframe src="https://www.youtube.com/embed/9BbXrk2rZ9I" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>`;
            document.querySelector('.detail__media').innerHTML = str;

            //detail__info is being populated
            console.log('   detail__info is being populated...')
            str = `
            <h2>${event.title}</h2>
                    <time>
                        <h3>${event.day_of_week} ${event.day} juli</h3>
                        <svg class="program__right-arrow" width="9" height="6" viewBox="0 0 9 6" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.132L1.06087 0L4.5015 3.7356L7.93913 0L9 1.132L4.5015 6L0 1.132Z"
                                fill="black" />
                        </svg>
                        <h3>${event.start}</h3>
                        <svg class="program__right-arrow" width="9" height="6" viewBox="0 0 9 6" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.132L1.06087 0L4.5015 3.7356L7.93913 0L9 1.132L4.5015 6L0 1.132Z"
                                fill="black" />
                        </svg>
                        <h3>${event.end}</h3>
                    </time>`;
                document.querySelector('.detail__info').innerHTML = str;

            //detail__content is being populated
            console.log('   detail__content is being populated...')
            str =`
            <p>${event.description}</p>`;
            document.querySelector('.detail__content').innerHTML = str;
            
            //detail__practical is being populated
            console.log('   detail__practical is being populated...')
            str = `
            <li>
                <div class="practical__title">
                    <p>website:</p>
                </div>
                <div class="practical__context">
                    <p>${event.url}</p>
                </div>
            </li>
            <li>
                <div class="practical__title">
                    <p>organisator:</p>
                </div>
                <div class="practical__context">
                    <p>${event.organizer}</p>
                </div>
            </li>
            <li>
            <div class="practical__title">
                <p>categoriën:</p>
            </div>
            <div class="practical__context">
                ${event.category.map(x=>{return `<p>${x}</p>`}).join('')}
            </div>
        </li>`
        document.querySelector('.detail__practical').innerHTML = str;
        
        //adding other events on events page - get other events from same organizer
        console.log('   adding other events on events page is started...')
        str = `
        <h2>Andere evenementen van ${event.organizer}</h2>`
        document.querySelector('.other-events__title').innerHTML = str;

        let arrFromThisOrganizer = this.events.filter(e => e.organizer === event.organizer)
        console.log('found events from the organizer: ', arrFromThisOrganizer)
        document.querySelector('.other-events__list').innerHTML = arrFromThisOrganizer.map(e => {
            return `
            <li>
                <a href="detail.html?day=${e.day}&slug=${e.slug}">
                    <div>
                        <h3>${e.day_of_week} - ${e.day} -- ${e.start}</h3>
                    </div>
                    <div>
                        <h3>${e.title}</h3>
                    </div>
                    <div>
                        <p>${e.organizer}</p>
                    </div>
                </a>
            </li>`
        }).join('')

        document.querySelector('.other-events__organisator').innerHTML = `<a href="#">Alle events van deze organisator</a>`

        },
        //FETCH FUNCTIONS
        loadEvents() {
            API.loadEvents(events => {
                this.saveEvents(events)
            })
        },
        saveEvents(events) {
            console.log('save events is running...', events)
            this.events = events

            this.initializeAfterEvents(); //fetch is done, the function for after fetch can start

        },
        //initialize the functions that require the fetch events to be completed, such as event data
        initializeAfterEvents() {
            console.log('functions after fetch-save events are started...')
            this.getDays();
            this.getRandomEventCard();
            this.createDetailPage();
        },
        //EVENTLISTENERFUNCTIONS
        showMenu(e) {
            let state = document.querySelector('.nav__items-container').classList.contains('hidden')
            if (state) {
                document.querySelector('.nav__items-container').classList.remove('hidden')
            } else {
                document.querySelector('.nav__items-container').classList.add('hidden')
            }
        },
        showProgram(e) {
            let state = document.querySelector('.nav__program-items').classList.contains('hidden')
            if (state) {
                document.querySelector('.nav__program-items').classList.remove('hidden')
                document.querySelector('.program__down-arrow').classList.add('hidden')
                document.querySelector('.program__up-arrow').classList.remove('hidden')
            } else {
                document.querySelector('.nav__program-items').classList.add('hidden')
                document.querySelector('.program__down-arrow').classList.remove('hidden')
                document.querySelector('.program__up-arrow').classList.add('hidden')
            }
        },
        //SUBFUNCTIONS
        //--> see subfunctions.js
        

        //INITIAL FUNCTIONS
        cacheElements() {
            this.$hamburger = document.querySelector('.nav__hamburger');
            this.$closeBtn = document.querySelector('.nav__close-btn');
            this.$program = document.querySelector('.program-tag');
        },
        eventListeners() {
            if (this.$hamburger) {
                this.$hamburger.addEventListener('click', (e) => {
                    this.showMenu(e);
                })
            }
            if (this.$closeBtn) {
                this.$closeBtn.addEventListener('click', (e) => {
                    this.showMenu(e);
                })
            }
            if (this.$program) {
                this.$program.addEventListener('click', (e) => {
                    this.showProgram(e);
                })
            }
        }
    }
    app.initialize();
})()