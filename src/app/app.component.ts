import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-patient';
  //constructor(private http: HttpClient) {}
  selecteur:number =0;
  button1():void{
    this.selecteur=1
  }
  button2():void{
    this.selecteur=2
  }
  patienttest:Patient = {
    identification:536,
    name:"Claire Estibal",
    telephone:"0643197104",
    gender:"nonbinaire",
    naissance:"le 3 janvier",
    adresse:"endroit random riviere"
  };
}
