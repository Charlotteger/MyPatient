export class Medecin{
    //propriété
id:number;
name:string;
telephone:string;
adresse:string;
    //méthode
getID():number{
    return this.id
}
getNom():string{
    return this.name
}
getTel():string{
    return this.telephone
}
getAdresse():string{
    return this.adresse
}
}