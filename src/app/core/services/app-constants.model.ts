import { Enum } from "../../shared/utilities/enum";

export class Api {
  public albums = "https://jsonplaceholder.typicode.com/albums";
  public comments = "https://jsonplaceholder.typicode.com/comments";
  public photos = "https://jsonplaceholder.typicode.com/photos";
  public posts = "https://jsonplaceholder.typicode.com/posts";
  public todos = "https://jsonplaceholder.typicode.com/todos";
  public users = "https://jsonplaceholder.typicode.com/users";
}

export class Application {
  public APP_NAME = "demo";
}

export class Languages {
  public SUPPORTED_LANG = ["en", "it", "de"];
  public SUPPORTED_LANG_DESC = ["English", "Italiano", "Deutsch"];
  public DEFAULT_LANGUAGE = "en";
}

export class LocalStorageKey {
  public LANGUAGE_ID = new Enum("LANGUAGE_ID");
}
