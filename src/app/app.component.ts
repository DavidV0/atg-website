import { Component } from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private scrollService: ScrollService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.use('de');
    this.translate.setDefaultLang('de');
  }
}
