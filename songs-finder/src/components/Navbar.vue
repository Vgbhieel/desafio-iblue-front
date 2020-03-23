<template>
    <nav>
        <v-app-bar dark>
            
            <!-- TÍTULO DA NAVBAR -->
            <v-toolbar-title>
                <a href="/" style="text-decoration: none;">
                <span class="font-weight-light white--text">Songs </span>
                <span class="white--text">Finder</span>
                </a>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- BOTÕES DA NAVBAR - NÃO MOBILE -->
            <div class="hidden-xs-only">

                <!-- BOTÃO HOME -->
                <v-btn href="/" class="elevation-0">
                    <span>Home</span>
                    <v-icon right>mdi-home-outline</v-icon>
                </v-btn>

                <!-- BOTÃO PESQUISAR -->
                <v-btn href="pesquisar" class="elevation-0">
                    <span>Pesquisar</span>
                    <v-icon right>mdi-magnify</v-icon>
                </v-btn>

                <!-- BOTÃO RELATÓRIO -->
                <v-btn href="relatorio" class="elevation-0">
                    <span>Relatório</span>
                    <v-icon right>mdi-database-search</v-icon>
                </v-btn>
            </div>

            <!-- BOTÕES DA NAVBAR - MOBILE -->
            <div class="d-sm-none">

                <!-- BOTÃO HOME -->
                <v-btn href="/" class="elevation-0">
                    <v-icon center>mdi-home-outline</v-icon>
                </v-btn>

                <!-- BOTÃO PESQUISAR -->
                <v-btn href="pesquisar" class="elevation-0">
                    <v-icon center>mdi-magnify</v-icon>
                </v-btn>

                <!-- BOTÃO RELATÓRIO -->
                <v-btn href="relatorio" class="elevation-0 ">
                    <v-icon center>mdi-database-search</v-icon>
                </v-btn>
            </div>
            </v-app-bar>
        </nav>
</template>

<script>
export default {
}
</script>