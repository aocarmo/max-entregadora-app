export class Constantes {
    //API_URL PRODUÇÃO
   
    public static API_LOGIN='https://sistema.maxentregadora.com.br/api/usuarios/autenticar.json';
    public static API_RECUPERAR_SENHA='https://sistema.maxentregadora.com.br/api/usuarios/recuperarSenha.json';
    public static OBTER_LISTA_INTIMACOES = "https://sistema.maxentregadora.com.br/api/diligentes/obterListaIntimacoes.json";
    public static API_ALTERAR_USUARIO = "https://sistema.maxentregadora.com.br/api/usuarios/alterarFoto.json";
    public static API_LOCALIZACAO_DILIGENTE = "https://sistema.maxentregadora.com.br/api/DiligenteLocalizacoes/registrar.json";
    public static API_OBTER_TIPOS_ENTREGA = "https://sistema.maxentregadora.com.br/api/MotivoEntregas/obterMotivosDeEntrega.json";
    public static API_REGISTRAR_PRE_BAIXA = "https://sistema.maxentregadora.com.br/api/intimacoes/registrarPreBaixa.json";
    public static API_OBTER_NOTIFICACOES = "https://sistema.maxentregadora.com.br/api/notificacoes/obterNotificacoes.json";
    public static API_EXCLUIR_NOTIFICACOES = "https://sistema.maxentregadora.com.br/api/notificacoes/excluirNotificacao.json";
    public static API_OBTER_CONFIGURACOES = "https://sistema.maxentregadora.com.br/api/Configuracoes/obterValorConfiguracao.json";
    public static API_OBTER_PREBAIXAS = "https://sistema.maxentregadora.com.br/api/diligentes/obterPreBaixas.json";
    
    /*
    public static API_LOGIN='http://192.168.0.18/apihuntvision/autenticacao';
  */

   
   



    //STORAGE KEYS
    public static STORAGE_USER='usuario';
    public static STORAGE_TOKEN='token';
    public static INTIMACOES='intimacoes';
    public static TIPOS_ENTREGA='tiposEntrega';
    public static NOTIFICACOES='notificacoes_';
    public static PREBAIXASOFF='prebaixaoff';


    //MENSAGENS PADRÃO
    public static INTERNET_INDISPONIVEL = 'Seu dispositivo está sem conexão ativa com a internet.';

    //Time out reuquest
    public static TIMEOUT_RESQUEST = 30000;
}