<template>  
  <v-app id="home">
    <!-- NAVBAR -->
    <Navbar />

    <!-- TÍTULO HOME PAGE -->
    <div class="text-center pt-5">
      <h1>Songs Finder - Home</h1>
    </div>
    <!-- CARD "PESQUISAR" -->
    <div class="pt-6 text-center">
      <v-card
        dark
        class="mx-auto mt-1 elevation-24"
        max-width="344"
      >
        <v-card-text white>
            <p class="display-1 white--text">
              Pesquisar
            </p>
          <div class="white--text">
            Nossa página de pesquisa permite que você procure por músicas, artistas e albuns que estão disponíveis
            para serem acessados no Deezer.
          </div>
        </v-card-text>
        <v-card-actions dark>
          <v-spacer></v-spacer>
          <v-btn
            href="pesquisar"
            text
            color="accent-4"
          >
            Acesse aqui
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
    <!-- CARD "RELATÓRIO" -->
    <div class="pt-6 text-center">
      <v-card
        dark
        class="mx-auto mt-1 elevation-24"
        max-width="344"
      >
        <v-card-text>
            <p class="display-1 white--text">
              Relatório
            </p>
          <div class="white--text">
            Na nossa página de pesquisa coletamos dados de cada pesquisa realizada e na nossa página de relatório
          permitimos que todos nossos usúarios vizualizem os dados que foram coletados.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            href="relatorio"
            text
            color="accent-4"
          >
            Acesse aqui
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: { Navbar },
}

</script>