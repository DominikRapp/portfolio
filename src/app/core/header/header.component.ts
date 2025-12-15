import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal, } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import AOS from 'aos';
import { TranslationService, AppLang } from '../translation.service';
import { BurgermenuComponent } from './burgermenu/burgermenu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonToggleModule, BurgermenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly activeId = signal<string>('');

  constructor(
    private translation: TranslationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.syncFromHash();
  }

  lang(): AppLang {
    return this.translation.getLang();
  }

  isGerman(): boolean {
    return this.translation.isGerman();
  }

  onLangChange(next: AppLang): void {
    this.translation.setLang(next);
  }

  onNavClick(id: string): void {
    this.activeId.set(id);
  }

  onHeaderLogoClick(event: MouseEvent): void {
    event.preventDefault();
    this.goHomeAndReset();
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.syncFromHash();
  }

  t(key: string): string {
    return this.translation.t(key);
  }

  private syncFromHash(): void {
    const hash = window.location.hash.replace('#', '');
    this.activeId.set(hash ? hash : '');
  }

  private goHomeAndReset(): void {
    this.activeId.set('');
    window.location.hash = '';
    void this.router.navigateByUrl('/').then(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        AOS.refreshHard();
      });
    });
  }
}
