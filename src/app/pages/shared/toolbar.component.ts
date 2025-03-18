import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, MatIconModule],
  template: `
    <header>
      <a routerLink="/"><h2>Taswira</h2></a>

      <form (submit)="onSearch($event)">
        <input type="search" placeholder="Chercher un film .." />
      </form>
    </header>
  `,
  styles: `
  header{
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 0 1rem;

    input {
      padding: 10px;
      border-radius: 5px;
      margin-left: 10px;
      width: 300px;
      outline: none;
      border: 1px solid #ccc;
      &:focus {
        border: 1px solid var(--primary-color);
      }
    }
  }
  `,
})
export class ToolbarComponent {
  router = inject(Router);

  onSearch(event: any) {
    event.preventDefault();
    // utilisation de queryParams pour passer le mot clé de recherche
    this.router.navigate(['/search'], {
      queryParams: { keyword: event.target[0].value },
    });
  }
}
