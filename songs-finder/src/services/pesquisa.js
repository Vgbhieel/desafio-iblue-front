import { http } from './config'

export default {

    listar:(argumento, index) => {
        return http.get('search', {
            params: {
              q: argumento,
              index: index,
              limit: 25,
              output: 'json'
            }
        })
    }
}