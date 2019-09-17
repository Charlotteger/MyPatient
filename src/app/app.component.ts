import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/classes/Patient';
import { allergie } from './classes/Allergie';
import { prescription } from './classes/Prescription';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient) {}
  title = 'my-patient';
  server = 'https://fhir.eole-consulting.io/api/';
  selecteur = 0;
  add = 0;
  prescriptionafficher: prescription;
  errorSympt = false;
  errorSubst = false;
  sympt = '';
  subst = '';

  patientTest: Patient = {
    identification: 536,
    name: 'Claire Estibal',
    telephone: '0643197104',
    gender: 'nonbinaire',
    naissance: 'le 3 janvier',
    adresse: 'endroit random riviere'
  };

  listeAllergie: allergie[] = [
    {name: 'acariens', symptome: 'toux'}, {name: 'sel', symptome: 'crises de rage'}
  ];

  listePrescription: prescription[] = [
    {name: 'prescription1' , medecin: 'Mme Gerber' , tarif: 'bien trop cher'},
    {name: 'prescription2' , medecin: 'M Schwarz' , tarif: 'Le juste prix'}
  ];

  button0(): void {
    this.selecteur = 0;
    this.add = 0;
  }
  button1(): void {
    this.selecteur = 1;
  }
  button2(): void {
    this.selecteur = 2;
  }
  buttonadd(): void {
    if (this.add === 0) {
      this.add = 1;
    } else {this.add = 0; }
  }
  afficher(p: prescription) {
    this.prescriptionafficher = p;
    this.selecteur = 4;
  }
  ajouterAllergie() {
    console.log(this.sympt);
    console.log(this.subst);
    if (this.subst === '') {
      this.errorSubst = true;
    } else {
      this.errorSubst = false;
    }
    if (this.sympt === '') {
      this.errorSympt = true;
    } else {
      this.errorSympt = false;
    }
    if (!this.errorSympt && !this.errorSubst) {
      this.add = 0;
      postAllergie(this.sympt, this.subst );
     }
  }

  ngOnInit() {
    this.getPatient().then(result => {
      console.log(result);
      for (const prop in result) {
        console.log(prop);
      }
    });
  }

  private getPatient(): Promise<any> {
    return this.http.get(this.server + 'patient/5d80aa2832364000151f8ad3').toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }




}
