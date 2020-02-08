class DadosPreBaixa  {
    public idEntregaIntimacaoDiligente: number;
    public idTentativaEntrega: number;
    public nomeTentativaEntrega: string;
    public idMotivoEntrega: number;
    public nomeMotivoEntrega: string;
    public idTipoDiligencia: number;
    public nomeTipoDiligencia: string;
    public nomeDiligentePreBaixa: string;
    public latitude: number;
    public longitude: number;
    public dataEntregaPreBaixa: string;
    public imagens: string[];   
    
}
class DadosBaixa {
    public idEntregaIntimacao: number;
    public dataEntregaBaixa: string;
    public idTipoDiligenciaBaixa: number;
    public nomeTipoDiligenciaBaixa: string;
    public idMotivoEntregaBaixa: number;
    public nomeMotivoEntregaBaixa: string;
    public nomeDiligenteBaixa: string;
    public observacao: string;
    public dadosPreBaixa: DadosPreBaixa;
    

}

class DadosDevedor {
    public numero_documento: string;
    public tipo_documento: string;
    public nome_empresarial: string;
    public nome_fantasia: string;
}

class DadosIntimacao {
    
    public idIntimacao: number;
    public numero_protocolo: string;
    public nome_destinatario: string;
    public idUltimoTipoDiligencia: number;
    public nomeUltimoTipoDiligencia: string; 
    public idUltimaTentativaEntrega: number;
    public nomeUltimaTentativaEntrega: string;
    public dtUltimaEntregaIntimacao: string;
    public nomeDiligenteIntimacao: string;
    public endereco: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public uf: string;
    public cep: string;
    public nomeSituacao: string;
    public enderecoCompleto: string;
    public dadosBaixa: DadosBaixa[];
    public dadosDevedor: DadosDevedor;
    
    
}

export class HistoricoIntimacao {
    public dadosIntimacao : DadosIntimacao[];
    public dadosDevedor : DadosDevedor;
}