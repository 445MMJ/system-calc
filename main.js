const App = ({

  data() {
    //こっちのdata部はDOM側でアクションが起きるやつを入れる
    return {
      np_type: "Quick"
      ,servant_name:''
      ,servant_class:'殺'
      ,np_level: "1"
      ,np_rate:1.07
      ,np_hit:10

      //バフ、エネミー、オーバーキル
      ,card_up_buff:0
      ,np_up_buff:0
      ,dtdr:1
      ,dtdr_list:[
        { text: '一般 剣 弓 槍', value: 1 },
        { text: '一般 騎', value: 1.1 },
        { text: '一般 術', value: 1.2 },
        { text: '一般 殺', value: 0.9 },
        { text: '一般 狂', value: 0.8 },
        { text: '一般 盾 裁 讐 分 降 詐', value: 1 },
      ]
      ,enemy_num:3
      ,enemy_num_list:[
        {value:2},
        {value:3},
        {value:4},
        {value:5},
        {value:6}
      ]
      ,overkill_hit:0
      ,test_value_1:[]
    }
  }
  ,computed: {
    //こっちは関数でresulted()関数の名前自体が向こうで変数になり、値はリターンされたやつ
    card_hosei(){
      return  this.np_type == "Arts" ? '3' : '1' 
    }
    ,resulted1(){
      return this.card_hosei * this.np_rate * (1 + this.card_up_buff * 0.01) * (1 + this.np_up_buff * 0.01) * this.dtdr * this.enemy_num
    }
    ,resulted2(){
      return this.resulted1 * (this.np_hit - this.overkill_hit) + this.resulted1 * this.overkill_hit * Number(1.5)
    }
    //listの内容をセレクトボックスに入れるのではなく、関数によって条件を満たしたもののみフィルターして返す（Q/A選択
    ,list(){
      return window.List.filter(value => 
        value.np_type == this.np_type )
    }
    ,get_servant(){
      return window.List.filter(value => 
        value.name == this.servant_name )
    }
  }
  ,methods:{
    get_servant_2(){
      this.servant_class = this.get_servant[0].class
      this.np_rate = this.get_servant[0].np_rate
      this.np_hit = this.get_servant[0].np_hit
      this.overkill_hit = 0
    }
  }

  
})

const app = Vue.createApp(App)
app.mount('#data_input')


