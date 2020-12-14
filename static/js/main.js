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
            //get the days of the events and push them uniquely to an array
            console.log(this.events[0]);
            this.days = []; //array of objects to be used such as full date, day of week, etc..
            let count = []; //check so that only unique days are being pushed to 'this.days' array
            this.events.forEach(event => {
                if (count.indexOf(event.day) == -1) {
                    let day = {
                        dayNum: event.day,
                        dayName: event.day_of_week,
                        month: 'Jul'
                    }
                    this.days.push(day)
                    count.push(event.day)
                }
            })
            console.log(this.days)

            //use the event days to populate the html page
            this.populateDays();
        },
        populateDays() {
            //first populate the days on the filter
            let $programDays = document.querySelector('.days')

            $programDays.innerHTML = this.days.map((day) => {
                return `
                <li>
                <a href="detail.html?day=${day.dayNum}">
                    <span class="day--text">${day.dayName.slice(0,2)}</span>
                    <span class="day--num">${day.dayNum} ${day.month}</span>
                </a>
            </li>
               `
            }).join('');

            //secondly populate the days in the hamburger menu list
            let $navProgramDays = document.querySelector('.nav__program-items')
            $navProgramDays.innerHTML = this.days.map((day) => {
                return `
                <li><a href="detail.html?day=${day.dayNum}">${day.dayName} ${day.dayNum} ${day.month}</a></li>`
            }).join('')
        },
        getRandomEventCard(){
            let $randomCard = document.querySelector('.random__cards')

            let str = "";
            for (let i = 0; i < 3; i++) {
                let randomEvent = this.events[this.generateRandomNum(this.events.length)];
                console.log(randomEvent)
                str += `
                <li class="random__card">
                <a href="detail.html?day=${randomEvent.day}">
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
            
        },
        //FETCH FUNCTIONS
        loadEvents() {
            API.loadEvents(events => {
                this.saveEvents(events)
            })
        },
        saveEvents(events) {
            console.log(events)
            this.events = events

            this.initializeAfterEvents(); //fetch is done, the function for after fetch can start

        },
        //initialize the functions that require the fetch events to be completed, such as event data
        initializeAfterEvents() {
            this.getDays();
            this.getRandomEventCard();
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
            } else {
                document.querySelector('.nav__program-items').classList.add('hidden')
            }
        },
        //SUBFUNCTIONS
        generateRandomNum(max) {
            return Math.floor(Math.random() * Math.floor(max))
        },
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