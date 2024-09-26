const vue = Vue.createApp({
    data() {
        return {
            gameInModal: { name: null },
            games: [],
            gameInfoModalInstance: null,
            addGameModalInstance: null,
            newGame: { name: '', price: 0 }
        };
    },
    async created() {
        this.games = await (await fetch('http://localhost:8080/games')).json();
    },
    methods: {
        getGame: async function(id) {
            this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
            this.gameInfoModalInstance = new bootstrap.Modal(document.getElementById('gameInfoModal'), {});
            this.gameInfoModalInstance.show();
        },
        closeModal() {
            if (this.gameInfoModalInstance) {
                this.gameInfoModalInstance.hide();
            }
        },
        openAddGameModal() {
            this.newGame = { name: '', price: 0 };
            this.addGameModalInstance = new bootstrap.Modal(document.getElementById('addGameModal'), {});
            this.addGameModalInstance.show();
        },
        closeAddGameModal() {
            if (this.addGameModalInstance) {
                this.addGameModalInstance.hide();
            }
        },
        async addGame() {
            await fetch('http://localhost:8080/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newGame)
            });
            this.games.push({ ...this.newGame, id: Date.now() });
            this.closeAddGameModal();
        }
    }
}).mount('#app');