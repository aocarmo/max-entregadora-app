  export class DadosDiligencia {
    
    public intimacao_id: number;
    public diligente_id: number;
    public tentativa_entrega_id: number;
    public tipo_diligencia_id: number;
    public motivo_entrega_id: number;
    public observacao: string;
    public usuario_id: number;
    public latitude: number;
    public longitude: number; 
    public arquivos: string [];
    public idEntregaIntimacao: number;
    public sync?: boolean;        


}
