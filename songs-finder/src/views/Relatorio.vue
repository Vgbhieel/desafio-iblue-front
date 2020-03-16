<template>
  <v-app id="relatorio">
    <Navbar />
    <div class="text-center pt-5 pb-1">
      <h1>Songs Finder - Relatório</h1>
    </div> 
    <div class="container">
      <div class="container d-flex">
        <v-spacer></v-spacer>
        <v-btn x-small @click="get_relatorio" dark class="grey darken-4" icon>
          <v-icon x-small center>mdi-reload</v-icon>
        </v-btn>
      </div>
      <v-data-table
          dark
          :headers="headers"
          :items="datas"
          class="elevation-24"
          :multi-sort=true
          :footer-props="{
            'items-per-page-all-text': 'Todos',
            'items-per-page-text': 'Itens por página:',
          }"
      >
      </v-data-table>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import get from '@/services/relatorio'
import 'moment';
var moment = require('moment');

export default {    
    name: 'Relatorio',
    components: { Navbar },
    data (){
    return {
      headers: [
        {
          text: 'Argumento Pesquisado',
          align: 'center',
          sortable: false,
          value: 'argumento',
        },
        { text: 'Data e Hora', value: 'date', align: 'center', sortable: true },
      ],
      datas: [],
      moment: moment,
    }
  },

  mounted(){
    this.get_relatorio()
  },
  
  methods:{
    
    // LISTA O RELATÓRIO, ARMAZENANDO NO ARRAY DATAS
    get_relatorio: function (){
      get.listar_local().then(resposta => {
      this.datas = resposta.data
      })
    }
  }
}
</script>