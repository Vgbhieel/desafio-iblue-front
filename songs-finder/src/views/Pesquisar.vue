<template>
  <v-app id="pesquisar">
    <!-- NAVBAR -->
    <Navbar />

    <!-- TÍTULO PÁGINA DE PESQUISA -->
    <div class="text-center pt-5">
      <h1>Songs Finder - Pesquisar</h1>
    </div>

    <!-- CONTAINER DO FORM E DA TABLE DO RESULTADO DA PESQUISA  -->
    <div class="container">
 
      <!-- FORM DA PESQUISA -->
      <v-form @submit.prevent='nova_pesquisa' align="right" class="text-right pt-1 pb-6">
        <v-col cols="12" sm="1000" md="0">
          <v-text-field v-model="search"
            label="Faça sua pesquisa"
            placeholder="Pesquise músicas, artistas ou albuns"
            outlined
          >
          </v-text-field>
        <v-btn @click='nova_pesquisa' dark black>
        Pesquisar
        </v-btn>
        </v-col>
      </v-form>

      <!-- DATA TABLE DO RESULTADO DA PESQUISA -->
      <v-data-table
          dark
          class="elevation-24"
          :headers="headers"
          :items="resultados"
          :footer-props="{
            'items-per-page-all-text': 'Todos',
            'items-per-page-text': 'Itens por página:',
          }">

        <!-- TEMPLATE PARA A EXIBIÇÃO DA DURAÇÃO DA MÚSICA -->
        <template #item.duration="{item}">
          {{moment.utc(item.duration*1000).format('mm:ss')}}
        </template>

        <!-- TEMPLATE PARA A EXIBIÇÃO DO LINK DA MÚSICA -->
        <template #item.link="{item}">
          <a :href="''+ item.link " target="_blank">
            <v-btn class="ma-2 text-right" elevation="0" style="display: inline-block;" right small>
            <v-icon left medium>mdi-play-circle</v-icon>
            <span>Ouça</span>
            </v-btn>
          </a>
        </template>
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
import Pesquisar from '@/services/pesquisa'
import Relatorio from '@/services/relatorio'

export default {    
    name: 'Pesquisar',
    components: { Navbar },
    data (){
    return {
      // CONFIGURAÇÃO DA DATA TABLE DE RESULTADOS
      headers: [
        {
          text: 'Título da Música',
          align: 'center',
          sortable: false,
          value: 'title_short',
        },
        { text: 'Artista', value: 'artist.name', sortable: false, align: 'center'},
        { text: 'Álbum', value: 'album.title', align: 'center' },
        { text: 'Duração', value: 'duration', sortable: false, align: 'center' },
        { text: 'Rank', value: 'rank', align: 'center' },
        { text: 'Ouça no Deezer', value:  'link', sortable: false, align: 'center' },
      ],
      search: null,
      index: 0,
      pesquisa_realizada: {
        argumento: null,
      },
      resultados: [],
      moment: moment,
    }
  },

  methods:{
        
    /* 
    FAZ O GET DO TOTAL DE ITENS DO ARGUMENTO PESQUISADO E ENTÃO
    REALIZA OUTRO GET LISTANDO TODOS OS RESULTADO DO ARGUMENTO PESQUISADO NO ARRAY resultados
    */
    get_pesquisa: function (){
      Pesquisar.listar(this.search, this.index)
        .then(resposta => {
          let total = resposta.data.total
          return total
        })
        .then(total => {
          while (this.index < total){
            Pesquisar.listar(this.search, this.index).then(resposta => {
              for (let i = 0; i < resposta.data.data.length; i++){
                this.resultados.push(resposta.data.data[i])
              }
            })
            this.index += 25;
          }
        })
    },

    /*
    DEFINE O index NOVAMENTE COMO 0 E
    REMOVE OS RESULTADOS DO ARRAY resultados
    */
    limpa_resultados: function () {
      this.index = 0;
      while(this.resultados.length > 0) {
        this.resultados.pop();
      }
    },

    // ARMAZENA OS DADOS PESQUISADOS NO OBJETO pesquisa_realizada
    armazena_pesquisa: function (argumento){
      this.pesquisa_realizada.argumento = argumento
    },

    // POST DOS DADOS DA PESQUISA
    post_pesquisa(){
      Relatorio.salvar(this.pesquisa_realizada)
    },

    // VALIDA SE A STRING IS BLANK
    isBlank(str) {
    return (!str || /^\s*$/.test(str));
    },

    /*
    IMPRIME O RESULTADO DA PESQUISA E
    REALIZA O POST DO ARGUMENTO PESQUISADO
    */
    nova_pesquisa: function (){
      if (this.isBlank(this.search)){
        return alert("Preencha o campo de pesquisa.")
      } else {
        this.limpa_resultados()
        this.get_pesquisa()
        this.armazena_pesquisa(this.search)
        this.post_pesquisa();
      }
    }
  }
}
</script>