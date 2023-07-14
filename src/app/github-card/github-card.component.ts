import { Component, Input } from '@angular/core';
import { GithubService } from '../github.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-github-card',
  templateUrl: './github-card.component.html',
  styleUrls: ['./github-card.component.scss']
})

export class GithubCardComponent  {
  @Input() users = []
  @Input() user
  @Input() isDetailsLoaded = false


  userDetails = {
    followingCount: 0,
    followers: 0,
    repositories: 0,
    profileUrl: ''
  }
 

  constructor(private githubService: GithubService) {}

  onShowDetails(userLogin: string) {
    if (!this.isDetailsLoaded) {
      const user = this.githubService.getUsers()
                .filter(item => item.login === userLogin)[0]

                console.log(user.repos_url)
      forkJoin ({
        following: this.githubService.fetchUrl(user.following_url, true, 13),
        followers: this.githubService.fetchUrl(user.followers_url, false, 0),
        repos: this.githubService.fetchUrl(user.repos_url, false, 0)
      })
        .subscribe({
          next: data => {
            this.userDetails = {
              followingCount: data.following.length,
              followers: data.followers.length,
              repositories: data.repos.length,
              profileUrl: user.html_url
            }
          },
          error: error => console.log(error),
          complete: () => this.isDetailsLoaded = true
        })
    }

    if (this.isDetailsLoaded) {
      this.isDetailsLoaded = !this.isDetailsLoaded
    }
  }
}
