import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import firebase from 'firebase';


@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;
  public publicacoes: any;

  constructor(private bd: Bd) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      //console.log(this.email);
      this.atualizarTimeLine();
    })
  }


  public atualizarTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        //console.log(publicacoes);
        this.publicacoes = publicacoes;
        //console.log(this.publicacoes);
      })
  }

}
