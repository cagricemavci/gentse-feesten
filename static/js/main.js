(() => {
    const app = {
        initialize() {
            API.loadEvents(events => {
                app.eventsData = events;
            })
            this.cacheElements();

            this.eventListeners();

        },
        //eventlistenerfunctions
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
            if(state) {
                document.querySelector('.nav__program-items').classList.remove('hidden')
            } else{
                document.querySelector('.nav__program-items').classList.add('hidden')
            }
        },
        //subfunctions
        cacheElements(){
            this.$hamburger = document.querySelector('.nav__hamburger');
            this.$closeBtn = document.querySelector('.nav__close-btn');
            this.$program = document.querySelector('.program-tag');
        },
        eventListeners(){
            if (this.$hamburger){
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