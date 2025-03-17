import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/shared/footer.component';
import { ToolbarComponent } from './pages/shared/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, ToolbarComponent],
  template: `
    <!-- Barre d'outils -->
    <app-toolbar />
    <!-- Contenu principal -->
    <router-outlet />
    <!-- Pied de page -->
    <app-footer />
  `,
  styles: [],
})
export class AppComponent {
  // Titre de l'application
  title = 'Taswira';
}
