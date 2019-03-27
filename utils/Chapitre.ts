export class Chapitre {
  private contenu: String;
  private titre: String;

  public static schema = {
    titre: {
      type: String,
      unique: true,
      index: false
    },
    contenu: String
  };

  public constructor();
  public constructor(t: String, c: String);
  public constructor(t?: String, c?: String) {
    this.contenu = c;
    this.titre = t;
  }

  public getTitre(): String {
    return this.titre;
  }
}
