class DadosIntimacao {
    public id: number;
    public numeroProtocolo: number;
    public nomeDestinatario: string;
    public documentoDestinatario: string;
    public nomeSituacaoIntimacao: string;
    public enderecoDestinatario: string;
    public dtLimite: string;
    public dtProtocolo: string;
}


class DadosPreBaixa  {
    public id: number;
    public diligente: string;
    public nomeTentativaEntrega: string;
    public nomeMotivoEntrega: string;
    public nomeTipoDiligencia: string;
    public latitudePreBaixa: number;
    public longitudePreBaixa: number;
    public dtEntrega: string;
    public imagens: string[];
    public observacao:string;
    
}
class DadosBaixa {
    public id: number;
    public dtEntrega: string;
    public nomeTipoDiligencia: string;
    public dtEntnomeMotivoEntregarega: string;

}


export class IntimacaoPreBaixa {
    
    public dadosIntimacao: DadosIntimacao;
    public dadosPreBaixa: DadosPreBaixa;
    public dadosBaixa: DadosBaixa;
   

}