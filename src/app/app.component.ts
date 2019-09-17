import { Component, OnInit } from '@angular/core';
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

export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  title = 'my-patient';
  server = 'https://fhir.eole-consulting.io/api/';
  selecteur = 0;
  add = 0;
  prescriptionafficher: prescription;
  errorSympt = false;
  errorSubst = false;
  sympt = '';
  subst = '';

  patientTest: Patient;

  listeAllergie: allergie[] = [
  ];

  listePrescription: prescription[] = [
    { name: 'prescription1', medecin: 'Mme Gerber', tarif: 'bien trop cher' },
    { name: 'prescription2', medecin: 'M Schwarz', tarif: 'Le juste prix' }
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
    } else { this.add = 0; }
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
      //postAllergie(this.sympt, this.subst );
    }
  }

  ngOnInit() {
    this.getPatient().then(result => {
      this.patientTest = {
        gender: result.gender,
        name: result.name[0].given + ' ' + result.name[0].family,
        naissance: new Date(result.birthDate), // require('dateformat'),
        identification: result.id,
        adresse: result.address[0].line + ' ' + result.address[0].postalCode + ' ' + result.address[0].city,
      };
    });
  }  

  private getPatient(): Promise<any> {
    return this.http.get(this.server + 'patient/5d80aa2832364000151f8ad3').toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  private postAllergie(newAllergie: allergie) {
    if (newAllergie != null)
      this.listeAllergie.push(newAllergie);
    this.listeAllergie.forEach(element => {
      var obj = JSON.stringify({
        "resourceType": "AllergyIntolerance",
        "reaction": [
          {
            "substance": {
              "coding": [
                {
                  "system": "https://fr.wikipedia.org",
                  "code": "1160593",
                  "display": element.substance
                }
              ]
            },
            "manifestation": [
              {
                "coding": [
                  {
                    "system": "https://fr.wikipedia.org",
                    "code": "39579001",
                    "display": element.manifestation
                  }
                ]
              }
            ]
          }
        ],
        "patient": {
          "reference": element.idPatient
        }
      });
      console.log(obj);
    });
  }
  //JSON.stringify({})
}

