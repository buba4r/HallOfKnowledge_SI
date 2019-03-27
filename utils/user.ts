export class User {
  private id: number;
  private pseudo: string;
  private nom: string;
  private prenom: string;
  private date_naissance: Date;
  private mail: string;
  private mot_de_passe: string;

  public constructor(
    pseudo: string,
    nom: string,
    prenom: string,
    date_naissance: Date,
    mail: string
  ) {
    this.pseudo = pseudo;
    this.nom = nom;
    this.prenom = prenom;
    this.date_naissance = date_naissance;
    this.mail = mail;
  }

  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }

  public getPseudo(): string {
    return this.pseudo;
  }
  public setPseudo(pseudo: string): void {
    this.pseudo = pseudo;
  }

  public getNom(): string {
    return this.nom;
  }
  public setNom(nom: string): void {
    this.nom = nom;
  }

  public getPrenom(): string {
    return this.prenom;
  }
  public setPrenom(prenom: string): void {
    this.prenom = prenom;
  }

  public getDateNaissance(): Date {
    return this.date_naissance;
  }
  public setDateNaissance(date_naissance: Date): void {
    this.date_naissance = date_naissance;
  }

  public getMail(): string {
    return this.mail;
  }
  public setMail(mail: string): void {
    this.mail = mail;
  }

  public getMotDePasse(): string {
    return this.mot_de_passe;
  }
  public setMotDePasse(mot_de_passe: string): void {
    this.mot_de_passe = mot_de_passe;
  }
}
