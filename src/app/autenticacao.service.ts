import { Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "./acesso/usuario.model";
import firebase from "firebase";
import { EventEmitter } from "@angular/core";

@Injectable()
export class Autenticacao {
   
    
    public token_id: string;

    //@Output() public existeErro: EventEmitter<string> = new EventEmitter();

    constructor(
        private router: Router
    ) {}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        //console.log("Chegamos até o serviço: ", usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => { 
                
                //remover a senha do atributo senha do objeto usuário
                delete usuario.senha;

                //btoa() converte string para base 64, atob() faz o inverso
                //ação necessária pois o path do firebase não aceita caracteres especiais
                //registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
                
            })
            .catch((error: Error) => {
                console.log('Erro no cadastro do usuário: ', error.message);
               // this.existeErro.emit(error.message);
            });
    }

    

    public autenticar(email: string, senha: string): void{

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {     
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        //sessionStorage.setItem('idToken', idToken);
                        localStorage.setItem('idToken', idToken)
                        //console.log('token valido: ', this.token_id);
                        this.router.navigate(['/home']);
                    })
            })
        .catch((error: Error) =>  { 
            console.log('Erro do servico autenticacao:', error.message);
            //this.existeErro.emit(error.message);
        });

    }

    public autenticado(): boolean {
        console.log('Token do método autenticado: ', this.token_id);
        
        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken');
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }

        //console.log('token_id após a autenticação: ', this.token_id);
        return this.token_id !== undefined;
        
    }

    public sair(): void {
        firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('idToken');
            this.token_id = undefined;
            this.router.navigate(['/']);
        })
        
    }

}
