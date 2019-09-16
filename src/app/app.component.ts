import { Component } from '@angular/core';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-patient';
  
  patienttest:Patient = {
    identification:536,
    name:"Claire Estibal",
    telephone:"0643197104",
    gender:"nonbinaire",
    naissance:"le 3 janvier",
    adresse:"endroit random riviere"
  };
}
