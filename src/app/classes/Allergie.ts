export class allergie {
    constructor(substance: string, manifestation: string, idPatient: string) {
        this.substance = substance;
        this.manifestation = manifestation;
        this.idPatient = idPatient;
    }
    substance: string;
    manifestation: string;
    idPatient: string;
}
