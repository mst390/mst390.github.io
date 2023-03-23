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
           scoreResult: {},//スコアボード
           start_btn: true,//開始ボタン
           fight_btn: false,//勝負ボタン
           change_btn: false,//カード変更ボタン
           restart_btn: true,//再戦ボタン
           end_btn: true,//終了ボタン
           result_win: false,//結果(勝利)画面
           result_lose: false,//結果(敗北)画面
           first: '',
           second: '',
           third: '',
           fourth: '',
           user_display: true,
           cp_display: true,
        };
    },

    methods: {
        start: function(){
            let i=0;
            let cardArray = new Array(4);
            let card;
            while(i < 4){
                
                cardPattern = Math.floor((Math.random()*4)+1);
                cardNumber = Math.floor((Math.random() * 13)+1);
                card = 'trumpCard/'+cardNumber+'_'+cardPattern + '.png';
       
                if(i !== 0){
                    if(!cardArray.includes(card)){
                        this.cardNumberArray[i] = cardNumber;
                        cardArray[i] = card;
                        i++;
                    }
                } else {
                    this.cardNumberArray[0] = cardNumber;
                    cardArray[0] = card;
                    i++;
                }
                
            }
            //カードの重複チェックが終わったら、ユーザとcpにそれぞれカードを振る
            console.log(cardArray)
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


            console.log(this.scoreResult.user)
            if(this.scoreResult.user === undefined){
                
                this.scoreResult.user = 0 + this.cardNumberArray[0];
                this.scoreResult.cp1 = 0 + this.cardNumberArray[1];
                this.scoreResult.cp2 = 0 + this.cardNumberArray[2];
                this.scoreResult.cp3 = 0 + this.cardNumberArray[3];
            } else {
                this.scoreResult.user = this.scoreResult.user + this.cardNumberArray[0];
                this.scoreResult.cp1 = this.scoreResult.cp1 + this.cardNumberArray[1];
                this.scoreResult.cp2 = this.scoreResult.cp2 + this.cardNumberArray[2];
                this.scoreResult.cp3 = this.scoreResult.cp3 + this.cardNumberArray[3];
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
            console.log(cardArray)
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
            this.score_result = false; //スコアボード非表示
            this.user_display = true; //ユーザー画面表示
            this.cp_display = true; //cp画面表示
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
            let pairs = Object.entries(this.scoreResult);
            pairs.sort(function(p1, p2){
            var p1Key = p1[1], p2Key = p2[1];
            if(p1Key < p2Key){ return -1; }
            if(p1Key > p2Key){ return 1; }
            return 0;
            })
            this.scoreResult = {};
            
            //順位ごとに名前とポイント数を入れる
            this.first = pairs[3][0] +':'+ pairs[3][1] + 'pt';
            this.second = pairs[2][0] +':'+ pairs[2][1] + 'pt'; 
            this.third = pairs[1][0] +':'+ pairs[1][1] + 'pt';
            this.fourth = pairs[0][0] + ':'+ pairs[0][1] + 'pt';
            //結果非表示し、スコアボード表示する
            this.result_win = false;
            this.result_lose = false;
            this.score_result  = true;
            this.user_display = false;
            this.cp_display = false;
            this.restart_btn = true;
        },
    },
}).mount('#main');
