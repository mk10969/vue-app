<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-toolbar color="indigo" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>自己紹介</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                  </v-container>
                </v-img>
                <v-spacer></v-spacer>
                <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ card.title }}</div>
                      <span class="grey--text">{{ card.grade}}</span>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="card.show = !card.show">
                      <v-icon>{{ card.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>share</v-icon>
                    </v-btn>
                  </v-card-actions>
                <v-slide-y-transition>
                  <v-card-text v-show="card.show">
                    <div style="white-space:pre-wrap; word-wrap:break-word;">{{ card.text }}</div>
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: '高槻 さん', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12, show: false, grade: "PB 3年目",
        text: `
        調布在住、３０歳、T.T.といいます。
        宜しくお願いいたします
        ` },
        { title: '横瀬 さん', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12, show: false, grade: "PB 3年目", 
        text: `
        千葉在住、２5歳、Y.T.といいます。 
        宜しくお願いいたします。
        
        仕事はシステムエンジニアをしています！
        都内と千葉を往復します。
        
        会社の仲間とキャンプに行ったりします。
        野球観戦をしていることも多いです！

        フットワークは軽い方だと思います！どこでもすぐに飛んでいけます！

        一緒にいる時間が、一番自分らしくいられるような、
        そんな関係になれたら幸せだなと思っています。

        まずは、気軽にお話ししましょう！
        `},
        { title: '山田 さん', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12, show: false, grade: "PB 2年目",
        text: `
        武蔵小杉在住、NTR-R.Y.といいます。
        宜しくお願いいたします。

        会社のインストラクタと、とても仲がいいです。
        東京大丸で、昼食を一緒に食べたり、
        会社の会議室２人きりで、インストラクタ面談をしたりしています。

        一緒に全裸でVRしている時間が、一番自分らしくいられるような、
        そんな関係になれたら幸せだなと思っています。

        まずは、気軽にNTRさせてください！
        ` }
      ]
    })
  }
</script>