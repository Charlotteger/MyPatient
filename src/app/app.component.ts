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
  server = "https://fhir.eole-consulting.io/api/";
  patientTest:Patient = {
    identification:536,
    name:"Claire Estibal",
    telephone:"0643197104",
    gender:"nonbinaire",
    naissance:"le 3 janvier",
    adresse:"endroit random riviere"
  };
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPatient().then(result => {
      console.log(result);  
      for(var prop in result){
        console.log(prop);
      } 
    })
  }

  private getPatient(): Promise<any> {
    return this.http.get(this.server + "patient/5d80aa2832364000151f8ad3").toPromise().catch(this.handleError);
  }

  private handleError(error : any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
