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
  dateFormat = '';
  Id = '5d80aa2832364000151f8ad3';
  newAllergie: allergie;
  patientTest: Patient = {
    identification: 536,
    name: 'Claire Estibal',
    telephone: '0643197104',
    gender: 'nonbinaire',
    naissance: new Date(),
    adresse: 'endroit random riviere'
  };

  listeAllergie: allergie[] = [
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
    this.getPrescription();
  }
  button2(): void {
    this.selecteur = 2;
    this.getAllergies();
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
      this.newAllergie = {
        substance: this.sympt, manifestation: this.sympt, idPatient: this.Id
      };
      //postAllergie(newAllergie );
      this.sympt = '' ;
      this.subst = '' ;
     }
  }

  getPrescription() {

  }

  getAllergies(){

  }
  
  initialisationPatient() {
    this.getPatient().then(result => {
    console.log(result);
    this.patientTest.gender = result.gender;
    this.patientTest.name = result.name[0].given + ' ' + result.name[0].family;
    this.patientTest.naissance = new Date(result.birthDate);
    this.dateFormat = this.patientTest.naissance.toString().slice(0, 15); // require('dateformat')(
    this.patientTest.identification = result.id;
    this.patientTest.adresse = result.address[0].line + ' ' + result.address[0].postalCode + ' ' + result.address[0].city;
  }); }

  initialisationListeAllergie() {
    this.listeAllergie.push(new allergie('poissons', 'boutons', this.Id), new allergie('carottes', 'démangeaisons', this.Id));
  }

  ngOnInit() {
    this.initialisationPatient();
    this.initialisationListeAllergie();
  }

  private getPatient(): Promise<any> {
    return this.http.get(this.server + 'patient/' + this.Id).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  private postAllergie(newAllergie:allergie) {
    
    //JSON.stringify({})
  }
}
