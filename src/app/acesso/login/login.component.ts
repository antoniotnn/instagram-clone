import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';


@Component({  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  
  public msgErroLogin: string;

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });


  constructor(
    private autenticacao: Autenticacao
  ) { }

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
    // this.autenticacao.existeErro.subscribe((mensagemErro: string) =>{
    //   this.msgErroLogin = mensagemErro;
    //   console.log(this.msgErroLogin);
    // })

    // console.log('Erro do login component recuperado: ', 
    //   this.autenticacao.existeErro.subscribe((mensagem: string) => {
    //     console.log('teste: ', mensagem)
    //   }))

  }
}
