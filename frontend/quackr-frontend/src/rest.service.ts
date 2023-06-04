import { Injectable } from '@angular/core';
import {Post} from "./model/Post";

@Injectable({
  providedIn: 'root'
})
/**
 * Service für die Kommunikation mit dem Backend.
 */
export class RestService {

  constructor() { }

  /**
   * Fragt die Posts vom Server an und gibt diese zurück. Vielleicht gibt er später ein Subject zurück.
   */
  public loadPosts(): Post[] {
    return [
      new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2),
      new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0),
      new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9),
      new Post("Post 4 \n Das ist ein sehr wichtiger Post", 6468, 647968)]
  }
}
