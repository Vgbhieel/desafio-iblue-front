import { http } from './config_api'

export default {

    listar_local:() => {
        return http.get('relatorio')
    },

    salvar:(pesquisa) => {
        return http.post('relatorio', pesquisa)
    }

}