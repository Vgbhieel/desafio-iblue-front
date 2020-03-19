import { http } from './config_api'

export default {

    listar:() => {
        return http.get('relatorio')
    },

    salvar:(pesquisa) => {
        return http.post('relatorio', pesquisa)
    }

}