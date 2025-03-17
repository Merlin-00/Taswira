import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../core/models/movie.model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MatCardModule, MatSelectModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent implements OnInit {
  // Propriété pour stocker les films populaires
  movies?: Movie[];
  // Propriété pour stocker les bandes-annonces des films
  trailers: { [key: number]: any[] } = {};
  api = inject(ApiService);
  // Liste des genres d'animes
  genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 35, name: 'Comédie' },
    { id: 18, name: 'Drame' },
    { id: 14, name: 'Fantastique' },
    { id: 27, name: 'Horreur' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science-Fiction' },
  ];
  // Propriété pour stocker les animes par genre
  animes: Movie[] = [];

  // Méthode pour récupérer les animes par genre
  getAnimesByChange(genreId: number): void {
    this.api.getAnimesByGenre(genreId).subscribe((anime) => {
      this.animes = anime.filter((anim) => anim.original_language === 'ja');
    });
  }

  // Méthode appelée lors du changement de genre
  onGenreChange(event: Event): void {
    const genreId = (event.target as HTMLSelectElement).value;
    this.getAnimesByChange(Number(genreId));
  }

  ngOnInit(): void {
    // Récupérer les films populaires au chargement du composant
    this.api.getMoviesByPopulary().subscribe((movies) => {
      this.movies = movies;
      this.movies.forEach((movie) => {
        this.api.getMovieTrailers(movie.id).subscribe((trailers) => {
          this.trailers[movie.id] = trailers;
        });
      });
    });
    // Récupérer les animes du premier genre par défaut
    this.getAnimesByChange(this.genres[0].id);
  }
}
