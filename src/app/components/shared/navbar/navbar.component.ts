import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { AppComponent } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() language: 'DE' | 'EN' = 'DE';
  isMenuOpen = false;

  translating() {
    this.language = this.language === 'DE' ? 'EN' : 'DE';
    this.appComponent.translate.setDefaultLang(this.language.toLowerCase());
    this.appComponent.translate.use(this.language.toLowerCase());
    this.languageService.setLen(this.language);
  }

  constructor(
    private languageService: LanguageService,
    private appComponent: AppComponent
  ) {}
}
