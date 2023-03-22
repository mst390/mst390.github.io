Vue.createApp({
    data: function(){
        return{
           user_card: 'trumpCard/backSide.png' ,
           user_selected_card: 'trumpCard/backSide.png' ,
           cp1_card: 'trumpCard/backSide.png',
           cp2_card: 'trumpCard/backSide.png',
           cp3_card: 'trumpCard/backSide.png' ,
           cardArray: [],
           cardNumberArray: new Array(4),
           start_btn: true,//開始ボタン
           fight_btn: false,//勝負ボタン
           change_btn: false,//カード変更ボタン
           restart_btn: true,//再戦ボタン
           end_btn: true,//終了ボタン
           result_win: false,//結果(勝利)画面
           result_lose: false,//結果(敗北)画面
        };
    },

    methods: {
        start: function(){
            let i=0;
            let cardArray = new Array(4);
            let cardPattern = 1;
            let cardNumber = 1;
            while(i < 4){
                
                cardPattern = Math.floor((Math.random()*4)+1);
                cardNumber = Math.floor((Math.random() * 13)+1);
                cardArray[i] = 'trumpCard/'+cardNumber+'_'+cardPattern + '.png';

                            
                if(i !== 0){
                    let check =0;
                    for(let x=0;x < i;x++){
                        if(cardArray[x] !== cardArray[i]){
                            check++;
                        }
                    }
                    if(check === i){
                        this.cardNumberArray[i] = cardNumber;
                        i++;
                    }
                } else {
                    this.cardNumberArray[0] = cardNumber;
                    i++;
                }
                
            }
            //カードの重複チェックが終わったら、ユーザとcpにそれぞれカードを振る
            
            this.user_selected_card = cardArray[0];
            this.cp1_card = cardArray[1];
            this.cp2_card = cardArray[2];
            this.cp3_card = cardArray[3];
            this.cardArray = cardArray;

            this.start_btn = false;//開始ボタン非表示
            this.fight_btn = true;//勝負ボタン表示
            this.change_btn = true;//カード変更ボタン表示
        },
        fight: function(){
            this.user_card = this.user_selected_card;

            this.start_btn = false;//開始ボタン非表示
            this.fight_btn = false;//勝負ボタン非表示
            this.change_btn = false;//カード変更ボタン非表示
            

            //ユーザのトランプの数値
            let userNumber = this.cardNumberArray[0];
            //cpとユーザの中で一番大きな数字を取り出す
            const maxNumber = Math.max.apply(null,this.cardNumberArray);
            if(maxNumber !== userNumber){
                this.result_lose = true;
            } else {
                this.result_win = true;
            }
        },
        change_card: function(){
            let check=0;
            let cardArray = this.cardArray;
            while(check < 1){

                let cardPattern = Math.floor((Math.random()*4)+1);
                let cardNumber = Math.floor((Math.random() * 13)+1);
                cardArray[0] = 'trumpCard/'+cardNumber+'_'+cardPattern + '.png';
                this.cardNumberArray[0] = cardNumber;
                    
                for(let x=1;x < 4;x++){
                    if(cardArray[x] !== cardArray[0]){
                        check++;
                    }
                }
                
            }
            //カードの重複チェックが終わったら、ユーザとcpにそれぞれカードを振る
            this.user_selected_card = cardArray[0];
            this.cp1_card = cardArray[1];
            this.cp2_card = cardArray[2];
            this.cp3_card = cardArray[3];
            this.cardArray = cardArray;

            this.start_btn = false;//開始ボタン非表示
            this.fight_btn = true;//勝負ボタン表示
            this.change_btn = true;//カード変更ボタン表示
        },
        restart: function(){//ゲーム開始画面に戻る
            //結果画面非表示
            this.result_win = false;
            this.result_lose = false;
            this.start_btn = true;//開始ボタン
            this.fight_btn = false;//勝負ボタン
            this.change_btn = false;//カード変更ボタン

            this.user_card='trumpCard/backSide.png';
            this.user_selected_card='trumpCard/backSide.png';
            this.cp1_card ='trumpCard/backSide.png';
            this.cp2_card='trumpCard/backSide.png';
            this.cp3_card='trumpCard/backSide.png';

        },
        end: function(){

        },
    },
}).mount('#main');
