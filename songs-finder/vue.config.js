module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  
  devServer: {
    proxy: 'https://api.deezer.com/'
  }
}