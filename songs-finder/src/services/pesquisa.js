import { http } from './config'

export default {

    listar:(argumento, pagina) => {
        return http.get('search', {
            params: {
              q: argumento,
              index: pagina,
              limit: 10,
              output: 'json'
            }
        })
    }
}