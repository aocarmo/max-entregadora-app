class Tentativa {
    public historicoTentativas: string [];
}


class Location  {
    public position: Position;
    public estimateTime: number;
    public distance: number;

}
class Position {
    public lat: number;
    public lng: number;

}


export class Intimacao {
    
    public idIntimacao: number;
    public cliente: string;
    public protocolo: number;
    public devedor: string;
    public documento: string;
    public endereco: string;
    public dtLimite: string;
    public dtProtocolo: string;
    public tentativa: string;
    public historicoTentativas: string[];
    public location: Location;
    public idEntregaIntimacao: number;
        


}