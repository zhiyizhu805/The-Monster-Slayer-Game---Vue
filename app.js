function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            counter: 0,
        }
    },

    computed:{
      monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
      },
        playerBarStyles(){
                if(this.playerHealth < 0){
                    return {width: '0%'}
                }
                return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.counter % 3 !== 0;
        }
    },

    methods: {
        attackMonster(){
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.counter++;
        },
        attackPlayer(){
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttack(){
            const attackValue = getRandomNumber(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.counter++;
        },

    }
}).mount("#game")