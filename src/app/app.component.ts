import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/classes/Patient';
import { allergie } from './classes/Allergie';
import { prescription } from './classes/Prescription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-patient';
  //constructor(private http: HttpClient) {}
  selecteur:number =0;
  button0():void{
    this.selecteur=0;
    this.add=0;
  }
  button1():void{
    this.selecteur=1;
  }
  button2():void{
    this.selecteur=2;
  }
  patienttest:Patient = {
    identification:536,
    name:"Claire Estibal",
    telephone:"0643197104",
    gender:"nonbinaire",
    naissance:"le 3 janvier",
    adresse:"endroit random riviere"
  };

listeallergie:allergie[]=[
{name:"acariens"},{name:"sel"}
]
add:number=0;
buttonadd():void{
  if(this.add==0){
    this.add=1
  }
  else{this.add=0}
}

listeprescription:prescription[]=[
  {name:"prescription1" , medecin:"Mme Gerber" , tarif:"bien trop cher"},
  {name:"prescription2" , medecin:"M Schwarz" , tarif:"Le juste prix"}
]

prescriptionafficher:prescription;

afficher(p : prescription){
  this.prescriptionafficher=p
  this.selecteur=4;
}
}
