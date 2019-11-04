export class Constantes {
    //API_URL PRODUÇÃO
   
    public static API_LOGIN='https://sistema.maxentregadora.com.br/api/usuarios/autenticar.json';
    public static API_RECUPERAR_SENHA='https://sistema.maxentregadora.com.br/api/usuarios/recuperarSenha.json';
    public static OBTER_LISTA_INTIMACOES = "https://sistema.maxentregadora.com.br/api/diligentes/obterListaIntimacoes.json";
    public static API_ALTERAR_USUARIO = "https://sistema.maxentregadora.com.br/api/usuarios/alterarFoto.json";
    
   

    /*
    public static API_LOGIN='http://192.168.0.18/apihuntvision/autenticacao';
  */

   
   



    //STORAGE KEYS
    public static STORAGE_USER='usuario';
    public static STORAGE_TOKEN='token';
    public static INTIMACOES='intimacoes';


    //MENSAGENS PADRÃO
    public static INTERNET_INDISPONIVEL = 'Seu dispositivo está sem conexão ativa com a internet.';

    //Time out reuquest
    public static TIMEOUT_RESQUEST = 30000;
}