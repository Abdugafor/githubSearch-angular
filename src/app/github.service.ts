import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'

interface IfetchUrl{
  url: string,
  doesNeedToCut: 'yes' | 'no',
  cutLength?: number,
}

@Injectable({
  providedIn: 'root'
})



export class GithubService {

  users = []

  constructor(private http: HttpClient) { }

  addUsers(usersArray) {
    this.users = usersArray.items
  }

  getUsers() {
    return this.users
  }

  fetchUsers(url: string): Observable<any> {
    return this.http.get(url)
  }


  fetchUrl(url, doesNeedToCut, cutLength) {
    
    const cuttedUrl = this.cutUrl(url, cutLength)

    return this.fetchUsers(doesNeedToCut ? cuttedUrl : url) 
  } 

  cutUrl(url: string, lengthToCut: number) {
    const urlLength = url.length - lengthToCut
    const res = url.slice(0, urlLength)
    return res
  }

  generateRandomString() {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
