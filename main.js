const App = ({

  data() {
    //こっちのdata部はDOM側でアクションが起きるやつを入れる
    return {
      //鯖情報関連
      np_type: "Arts"
      ,servant_name:''
      ,servant_class:'殺'
      ,np_level: "1"
      ,np_rate:0.57
      ,np_hit:1
      ,skill_list:[]

      //バフ
      ,card_up_buff:0
      ,np_up_buff:0

      ,card_up_buff_input_self:0
      ,np_up_buff_input_self:0

      //エネミー
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

      //オーバーキル
      ,overkill_hit:0
      ,checked_test:false
      
      //スキル
      //大本のデータベースになるsupport_skill_list、それをもとにコンポーネント化してユーザーにチェックさせた結果がchecked_skills
      //checked_skillsはIDのみなのでこれをselected_skills関数でスキルリストに戻す
      //selected_skillsのリストからcard_up_buff_input_autoやnp_up_buff_input_autoを算出する


      ,checked_skills:[]     

    }
  }
  ,computed: {
    //こっちは関数でresulted()関数の名前自体が向こうで変数になり、値はリターンされたやつ
    card_hosei(){
      return  this.np_type == "Arts" ? '3' : '1' 
    }
    ,np_per_hit(){
      
      this.card_up_buff = Number(this.card_up_buff_input_self) + this.card_up_buff_input_auto
      this.np_up_buff = Number(this.np_up_buff_input_self) + this.np_up_buff_input_auto
      return this.card_hosei * this.np_rate * (1 + this.card_up_buff * 0.01) * (1 + this.np_up_buff * 0.01) * this.dtdr * this.enemy_num
    }
    ,result_np(){
      return this.np_per_hit * (this.np_hit - this.overkill_hit) + this.np_per_hit * this.overkill_hit * Number(1.5)
    }

    //鯖一覧リスト作り
    //別ファイルのList（全サバ乗ってる）の内容をそのままセレクトボックスに入れるのではなく、
    //関数によって条件を満たしたもののみフィルターして返す（Q/A選択)
    ,list(){
      return window.List.filter(value => 
        value.np_type == this.np_type )
    }

    ,get_servant(){
      return window.List.filter(value => 
        value.name == this.servant_name )
    }

    ,support_skill_list(){
      var sum_list= []
      if (this.np_type == "Arts"){
        sum_list = sum_list.concat(Artoria);
      }
      if (this.np_type == "Quick"){
        sum_list = sum_list.concat(Scathach);
      }
      return sum_list
    }

    ,selected_skills(){
      const arr = this.support_skill_list
      const conds = this.checked_skills
      const res = arr.filter(value => 
        conds.includes(value.id))
      return res  
    }

    


    

    ,card_up_buff_input_auto(){
      const adede = this.selected_skills
      let pepe = 0
      for (let i = 0; i < adede.length; i++) {
        if (adede[i].type == "card_up"){
          pepe = pepe + adede[i].value
        }
      }
      return pepe
    }

    ,np_up_buff_input_auto(){
      const adede = this.selected_skills
      let pepe = 0
      for (let i = 0; i < adede.length; i++) {
        if (adede[i].type == "np_up"){
          pepe = pepe + adede[i].value
        }
      }
      return pepe
    }

    

  }
   
  ,methods:{
    get_servant_2(){
      this.servant_class = this.get_servant[0].class
      this.np_rate = this.get_servant[0].np_rate
      this.np_hit = this.get_servant[0].np_hit
      this.overkill_hit = 0
      this.skill_list = this.get_servant[0].skill
    },
    
  }
  
})

const app = Vue.createApp(App)


//スキル適用チェックボックスを描画するコンポーネント
app.component('skill_checkbox', {
  props: ["modelValue",'id','name'],
  emits: ['update:modelValue'],
  computed: {
    checked:{
      get(){
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
  ,template: `
    <label>
    <input 
      type="checkbox"
      v-model="checked"
      :value="id"/>
    {{ name }}
    </label><br>`
})

//ユーザー手入力フォームのコンポーネント
app.component('input_form', {
 props: ["input_number"],
 emits: ['update:input_number'],
 template: `
   <input
     type="number"
     :value="input_number"
     @input="$emit('update:input_number', $event.target.value)">`
})






app.mount('#data_input')

