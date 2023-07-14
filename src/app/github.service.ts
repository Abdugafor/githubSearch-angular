import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'

interface IfetchUrl{
  url: string,
  doesNeedToCut: boolean,
  cutLength?: number,
}

@Injectable({
  providedIn: 'root'
})



export class GithubService {

  users = []

  constructor(private http: HttpClient) { }

  public addUsers(usersArray) {
    this.users = usersArray.items
  }

  public getUsers() {
    return this.users
  }

  public fetchUsers(url: string): Observable<any> {
    return this.http.get(url)
  }


  public fetchUrl(params: IfetchUrl) {
    
    const cuttedUrl = this.cutUrl(params.url, params.cutLength)

    return this.fetchUsers(params.doesNeedToCut ? cuttedUrl : params.url) 
  } 

  private cutUrl(url: string, lengthToCut: number): string {
    const urlLength = url.length - lengthToCut
    const res = url.slice(0, urlLength)
    return res
  }

  public generateRandomString() {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
