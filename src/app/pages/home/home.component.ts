import { Component, inject } from '@angular/core';
import MoviesComponent from '../movies/movies.component';
import { ApiService } from '../../core/services/api.service';
import { Movie } from '../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MoviesComponent, CommonModule, MatCardModule, RouterLink],
  template: `
    <header class="container">
      <div align="center" class="item">
        <h1>Bienvenue sur Taswira</h1>
        <h3>une application qui classe les videos par popularité</h3>
        <br />
        <input
          type="search"
          placeholder="rechercher un titre dans taswira"
          maxlength="100"
          (input)="onSearch($event)"
          (blur)="onBlur()"
        />
        @if (searchResults &&searchPerformed && searchResults.length === 0) {
        <p>Aucun résultat trouvé.</p>
        }
      </div>
      <div class="box">
        <img
          src="assets/1695672919891.jpg"
          width="300px"
          height="300px"
          alt="animé picture"
        />
      </div>
    </header>
    <main>
      @if (searchResults && searchResults.length) { @for (movie of
      searchResults; track $index) {
      <mat-card
        [routerLink]="'/movie/' + movie.id"
        class="img-card"
        appearance="outlined"
      >
        <mat-card-header>
          <mat-card-title-group>
            <mat-card-title>
              {{ movie.title }}
            </mat-card-title>
            <mat-card-subtitle>
              Popularité: {{ movie.popularity }}
            </mat-card-subtitle>
          </mat-card-title-group>
        </mat-card-header>
        <img
          mat-card-image
          [src]="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
          alt="{{ movie.title }}"
        />
      </mat-card>
      } }
    </main>
    @if (!searchResults || !searchResults.length) {
    <app-movies></app-movies>
    }
  `,
  styles: ` 
  .container{
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    background: #f0f4ff;
  }
  .img-card {
  max-width: 400px;
  margin-bottom: 8px;
  box-sizing: border-box;
  transition: 250ms ease-in-out;
  &:hover {
    opacity: 0.8;
    scale: 0.95;
  }
}
  input{
      width: 50vw;
      padding: 0.5rem;
      font-size: 1rem;
  }
  `,
})
export default class HomeComponent {
  api = inject(ApiService);
  searchResults: Movie[] = [];
  searchPerformed = false;

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchPerformed = true;
    if (query) {
      this.api.searchMovies(query).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }
  onBlur(): void {
    this.searchPerformed = false;
  }
}
