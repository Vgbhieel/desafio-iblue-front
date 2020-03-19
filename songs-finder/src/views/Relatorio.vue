<template>
  <v-app id="relatorio">
    <!-- NAVBAR -->
    <Navbar />

    <!-- TÍTULO PÁGINA DE RELATÓRIO -->
    <div class="text-center pt-5 pb-1">
      <h1>Songs Finder - Relatório</h1>
    </div>

    <!-- CONTAINER DA DATA TABLE DO RELATÓRIO -->
    <div class="container">

      <!-- BOTÃO DE ATUALIZAÇÃO DA TABLE -->
      <div class="container d-flex">
        <v-spacer></v-spacer>
        <v-btn x-small @click="get_relatorio" dark class="grey darken-4" icon>
          <v-icon x-small center>mdi-reload</v-icon>
        </v-btn>
      </div>

      <!-- DATA TABLE DO RELATÓRIO -->
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

// IMPORTAÇÃO DO MOMENT.JS
import 'moment';
var moment = require('moment');

// IMPORTAÇÃO DOS MEUS COMPONENTES E SERVIÇOS
import Navbar from '@/components/Navbar'
import get from '@/services/relatorio'


export default {    
    name: 'Relatorio',
    components: { Navbar },
    data (){
    return {
      // CONFIGURAÇÃO DA DATA TABLE DO RELATÓRIO
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
    // LISTA O RELATÓRIO AO MONTAR O COMPONENTE
    this.get_relatorio()
  },
  
  methods:{
    
    // LISTA O RELATÓRIO, ARMAZENANDO AS INFORMAÇÕES NO ARRAY datas
    get_relatorio: function (){
      get.listar().then(resposta => {
      this.datas = resposta.data
      })
    }
  }
}
</script>