import { Component, Input } from '@angular/core';
import { GithubService } from './github.service';
import {from,  Observable, of, fromEvent, debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  users: any = []
  showLoader: boolean = false
  showError: boolean = false

    constructor (private githubService: GithubService) {}

    getUsers(name: string) {
      this.showLoader = true
      this.users = []

      this.githubService.fetchUsers('https://api.github.com/search/users?q=' + name).subscribe({
        next: data => {
          this.users = data.items
          this.showLoader = false
          this.githubService.addUsers(data)
        },
        error: error => {
          this.showLoader = false
          this.showError = true
        }
      })
    }
}
