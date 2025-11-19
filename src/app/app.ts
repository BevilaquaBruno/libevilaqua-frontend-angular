import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavContent, MatSidenavContainer, MatSidenav } from "@angular/material/sidenav";
import { MatIcon } from "@angular/material/icon";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatNavList, MatDivider, MatListItem } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { filter } from 'rxjs';
import { Languages } from './enums/languages.enum';
@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    RouterModule,
    MatGridListModule,
    MatSidenavContent,
    MatSidenavContainer,
    MatIcon,
    MatSidenav,
    MatButtonModule,
    MatExpansionModule,
    MatNavList,
    MatDivider,
    MatListItem
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  isMobile = false;
  private router = inject(Router);
  currentUrl = signal<string>('');
  noMenuRoutes = [
    '/login',
    '/esqueci-a-senha',
    '/resetar-senha',
    '/nova-biblioteca',
    '/confirmar-acesso',
    '/404'
  ];

  shouldntShowMenu = computed(() =>
    this.noMenuRoutes.some(path => this.currentUrl().includes(path))
  );

  isDark = signal(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    // Observa quando a tela é menor que 768px (você pode ajustar)
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;

      // Ajusta o modo do sidenav conforme o tipo de tela
      if (this.drawer) {
        this.drawer.mode = this.isMobile ? 'over' : 'side';
        if (!this.isMobile) this.drawer.open();
      }
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });

    /**
     * Define o idioma do usuário com base no navegador
     */
    if (!localStorage.getItem('language')) {
      const lang = (navigator.language || (navigator.languages ? navigator.languages[0] : 'en')).toLowerCase();
      const supportedLanguages = Object.values(Languages);
      const userLanguage = ((supportedLanguages as string[]).includes(lang)) ? lang : 'en';

      localStorage.setItem('language', userLanguage);
    }
  }

  /** Só fecha o menu se estiver no modo mobile */
  closeIfMobile() {
    if (this.isMobile) {
      this.drawer.close();
    }
  }

  toggleTheme() {
    this.isDark.update(v => !v);

    if (this.isDark()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
