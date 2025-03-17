import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar>
      <a routerLink="/"><h2>Taswira</h2></a>
      <input type="search" />
    </mat-toolbar>
  `,
  styles: `
  mat-toolbar{
    position: sticky;
    top: 0;
    z-index: 100;
    height: 3rem;
    display: flex;
    justify-content: space-around;
  }
  `,
})
export class ToolbarComponent {}
