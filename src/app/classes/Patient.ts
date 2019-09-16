class Patient {
    //proprietés
identification:number;
name:string;
telephone:string;
gender:string;
naissance:string;
adresse:string;


    //méthodes
getId():number{
    return this.identification;
}
getNom(){
    return this.name;
}
getTel(){
    return this.telephone;
}
getSexe(){
    return this.gender;
}
getBirth(){
    return this.naissance;
}
getAdresse() {
    return this.adresse;
}
}