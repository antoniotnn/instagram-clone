import firebase from "firebase";
import { Injectable } from "@angular/core";
import { Progresso } from "./progresso.service";

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) {}


    public publicar(publicacao: any): void {
        
        console.log(publicacao);

        let nomeImagem = Date.now();

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo } )
            .then((resposta: any) => {
                console.log("Key do database: ", resposta);
            })


        // firebase.storage().ref()
        //     .child(`imagens/${nomeImagem}`)
        //     .put(publicacao.imagem)
        //     .on(firebase.storage.TaskEvent.STATE_CHANGED,
        //         //acompanhamento do progresso de upload
        //         (snapshot: any) => {
        //             this.progresso.status = 'andamento';
        //             this.progresso.estado = snapshot;
        //             console.log('snapshot capturado no on() ', snapshot);
        //         },
        //         (error) => {
        //             this.progresso.status = 'erro';
        //             //console.log(error);
        //         },
        //         () => {
        //            //finalização do processo de upload
        //            this.progresso.status = 'concluido'
        //            //console.log('Upload completo');
        //         }
        //     )

        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push( { titulo: publicacao.titulo } );

        // console.log("Chegamos até o serviço de controle de dados");
        
    }
}