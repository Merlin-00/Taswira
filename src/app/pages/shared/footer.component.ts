import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer>
      <div class="footer-container">
        <div class="left-container">
          <div>
            <p><b>VIDEOS</b></p>
            <a routerLink=""></a>
            <a routerLink=""></a>
            <a routerLink=""></a>
            <a routerLink=""></a>
          </div>
          <div>
            <p><b>LIENS</b></p>
            <a
              href="https://x.com/Merlin_Lubambo?t=w-wI13_Zlg9XkQ-MNZJJFw&s=08"
              target="_blank"
              >Merlin X</a
            >
            <a href="https://github.com/Merlin-00/Merlin-00.git" target="_blank"
              >Merlin github</a
            >
            <a
              href="https://www.linkedin.com/in/merlin-lubambo-97b2b6336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              >Merlin linkedln</a
            >
          </div>
        </div>
        <p>
          <b>Taswira {{ date.getFullYear() }}</b
          ><br />
          Developpé par Merlin Lubambo
        </p>
      </div>
    </footer>
  `,
  styles: `
  footer{
    background: #e4e4e4;
    color: #078ebb;
  }
  .footer-container{
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 2rem;
    flex-wrap: wrap;
  }
  .left-container{
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    a {
      display: block;
      margin: 0.5rem 0;
      color: #323263;
      &:hover {
        color: #6767fa;
        border-bottom: 2px solid #6767fa;
      }
    }
  }
  `,
})
export class FooterComponent {
  date = new Date();
}
