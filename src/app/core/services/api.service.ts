import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieDetails } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // URL de base de l'API
  API = 'https://api.themoviedb.org/3';
  http = inject(HttpClient);
  // Clé API pour accéder à l'API
  apiKey = 'dbfd3e4da2971963ef137f5549fccf30';

  // sont mes options pour l'API de The Movie Database
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjJkZjBmNzY3YmZhZTNkZjBiZDc3ZGU0NjRiNDRmMSIsIm5iZiI6MTY3NTEzMzc3OC4yMzcsInN1YiI6IjYzZDg4MzUyMTJiMTBlMDA3ZmRjNDE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7EpK97liyiuvOEcBb-Uf3EJi-tk9hvWF2quyUW-Q6yg',
    },
  };

  getMovies(query: string, genre?: string) {
    const url = genre
      ? `${this.API}/movie/${query}?api_key=${this.apiKey}&language=fr-FR&page=1&with_genres=${genre}`
      : `${this.API}/movie/${query}?api_key=${this.apiKey}&language=fr-FR&page=1`;
    const genreUrl = `${this.API}/discover/movie?api_key=${this.apiKey}&with_genres=${genre}`;
    return this.http
      .get<{ results: Movie[] }>(genre ? genreUrl : url, this.options)
      .pipe(map((response) => response.results));
  }

  // Récupérer les animes par genre
  getAnimesByGenre(genreId: number): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>(
        `${this.API}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&with_original_language=ja`
      )
      .pipe(
        map((response) =>
          response.results.sort((a, b) => b.popularity - a.popularity)
        )
      );
  }

  // Récupérer les bandes-annonces d'un film
  getMovieTrailers(movieId: number): Observable<any> {
    return this.http
      .get<{ results: any[] }>(
        `${this.API}/movie/${movieId}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((response) => response.results));
  }

  // Rechercher des films par requête
  searchMovies(query: string): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>(
        `${this.API}/search/movie?api_key=${this.apiKey}&query=${query}`
      )
      .pipe(
        map((response) =>
          response.results.sort((a, b) => b.popularity - a.popularity)
        )
      );
  }

  // Récupérer les détails d'un film par ID
  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.API}/movie/${id}?api_key=${this.apiKey}`
    );
  }
}
