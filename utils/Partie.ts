export class Partie {
  private titre: String;

  public static schema = {
    titre: {
      type: String,
      unique: true,
      index: false
    }
  };

  public constructor();
  public constructor(t: String);
  public constructor(t?: String) {
    this.titre = t;
  }

  public getTitre(): String {
    return this.titre;
  }
}
