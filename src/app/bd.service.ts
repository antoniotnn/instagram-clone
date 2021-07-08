import firebase from "firebase";
import { Injectable } from "@angular/core";
import { Progresso } from "./progresso.service";

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) {}


    public publicar(publicacao: any): void {
        
        //console.log(publicacao);

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo } )
            .then((resposta: any) => {
                //console.log("Key do database: ", resposta.key);
                let nomeImagem = resposta.key;

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    //acompanhamento do progresso de upload
                    (snapshot: any) => {
                        this.progresso.status = 'andamento';
                        this.progresso.estado = snapshot;
                        //console.log('snapshot capturado no on() ', snapshot);
                    },
                    (error) => {
                        this.progresso.status = 'erro';
                        //console.log(error);
                    },
                    () => {
                        //finalização do processo de upload
                        this.progresso.status = 'concluido'
                        //console.log('Upload completo');
                    }
            )

        })
   
    }
}