import { Component, inject } from '@angular/core';
import MoviesComponent from '../movies/movies.component';
import { ApiService } from '../../core/services/api.service';
import { Movie } from '../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MoviesComponent, CommonModule, MatCardModule],
  template: `
    <main>
      <!-- Je commente cette section , tu pourras y travailler plutard -->
      <!-- <header
        style="min-height: 40vh; display: flex; justify-content: center; align-items: center; flex-direction: column; background: #444; color: #fff; text-align: center; border-radius: 8px; margin-top: 1rem;"
      >
        <div style="z-index: 1;">
          <h1>Bienvenue sur Taswira</h1>
          <h3>Une application qui classe les vidéos par popularité</h3>
          <button class="btn">Voir tous les films</button>
        </div>

        <div
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('your-background-image.jpg') center/cover no-repeat; opacity: 0.2; z-index: 0;"
        ></div>
      </header> -->

      <div style="padding: 1rem;">
        <app-movies
          sectionTitle="Films populaires"
          query="popular"
        ></app-movies>
      </div>
      <div style="padding: 1rem;">
        <app-movies sectionTitle="Films A venir" query="upcoming"></app-movies>
      </div>
    </main>
  `,
  styles: ` 
 
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
