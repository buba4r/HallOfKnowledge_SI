export class Cours {
  private theme: String;
  private titre: String;
  private auteur: String;
  private description: String;
  private objectifs: String[];

  public static schema = {
    theme: String,
    titre: {
      type: String,
      unique: true,
      index: false
    },
    auteur: String,
    description: String,
    objectifs: [String]
  };

  public constructor();
  public constructor(th: String, t: String, a: String, d: String, ob: String[]);
  public constructor(
    th?: String,
    t?: String,
    a?: String,
    d?: String,
    ob?: String[]
  ) {
    this.theme = th;
    this.titre = t;
    this.auteur = a;
    this.description = d;
    this.objectifs = ob;
  }

  public getTitre(): String {
    return this.titre;
  }
}
