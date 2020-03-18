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
          hide-default-footer
          :headers="headers"
          :items="resultados"
          class="elevation-24"
      >

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

    <!-- CONTAINER DO CONTROLADOR DE PÁGINA -->
    <div class="container text-center">

      <!-- BOTÃO DE PÁGINA ANTERIOR -->
      <v-btn @click="pag_anterior()" dark class="black ma-2 text-left" elevation="0" style="display: inline-block;" left small>
        <v-icon dark left small>mdi-arrow-left</v-icon>
        <span>Página Anterior</span>
      </v-btn>

      <!-- BOTÃO DE PÁGINA ATUAL -->
      <v-btn fab dark small elevation="10" class="black">
        <p style="font-weight: bold; display: inline-block; margin: 0px 30px;">{{pagina_atual}}</p>
      </v-btn>

      <!-- BOTÂO DE PRÓXIMA PÁGINA -->
      <v-btn @click="proxima_pag()" dark class="black ma-2 text-right" elevation="0" style="display: inline-block;" right small>
        <span>Próxima Página</span>
        <v-icon dark right x-small>mdi-arrow-right</v-icon>
      </v-btn>
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
      pesquisa_realizada: {
        argumento: null,
      },
      resultados: [],
      pagina: 0,
      pagina_atual: 1,
      max_paginas: 0,
      moment: moment,
    }
  },

  methods:{

    /* LISTA O RESULTADO DO ARGUMENTO PESQUISADO NO ARRAY resultados
    E AMAZENA O ARGUMENTO PESQUISADO NA VAR search
    */
    get_pesquisa: function (){
      this.salva_pesquisa(this.search)
      Pesquisar.listar(this.search, this.pagina).then(resposta => {
        this.resultados = resposta.data.data
        this.max_paginas = resposta.data.total
        this.formata_duracao();
      })
    },

    // IMPRIME O RESULTADO DA PESQUISA E REALIZA O POST DO ARGUMENTO PESQUISADO
    nova_pesquisa: function (){
      if (this.isBlank(this.search)){
        return alert("Preencha o campo de pesquisa.")
      } else {
        this.pagina = 0;
        this.pagina_atual = 1;
        this.get_pesquisa();
        this.post_pesquisa(this.pesquisa_realizada);
      }
    },

    // SALVA OS DADOS PESQUISADOS NO OBJETO pesquisa_realizada
    salva_pesquisa: function (argumento){
      this.pesquisa_realizada.argumento = argumento
    },

    // POST DOS DADOS DA PESQUISA
    post_pesquisa(){
      Relatorio.salvar(this.pesquisa_realizada)
    },

    // FORMATA A DURAÇÃO RECEBIDA DA MÚSICA
    formata_duracao: function() {
      for (let i = 0; i < this.resultados.length; i++){
        this.resultados[i].duration = moment.utc(this.resultados[i].duration*1000).format('mm:ss')
      }
    },

    // VALIDA SE A STRING IS BLANK
    isBlank(str) {
    return (!str || /^\s*$/.test(str));
    },

    // LISTA A PROXIMA PAGINA DO RESULTADO
    proxima_pag: function (){
      if ((this.pagina + 9 >= this.max_paginas) || (this.pagina + 10 == this.max_paginas)){
        alert("Não há uma página posterior a essa.");
        return
      } else {
        this.search = this.pesquisa_realizada.argumento
        this.pagina += 10
        this.pagina_atual += 1
        this.get_pesquisa();
      }
    },

    // LISTA A PAGINA ANTERIOR DO RESULTADO
    pag_anterior: function (){
      if ((this.pagina == 0) || ((this.pagina - 10) < 0)){  
        this.pagina = 0
        this.pagina_atual = 1
        alert("Não há uma página anterior a essa.") 
        return
      } else {
        this.search = this.pesquisa_realizada.argumento
        this.pagina -= 10;
        this.pagina_atual -= 1
        this.get_pesquisa();
      }
    },
  }
}
</script>