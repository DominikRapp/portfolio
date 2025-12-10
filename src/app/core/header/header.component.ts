import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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

  constructor(private translation: TranslationService) { }

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
    window.location.reload();
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.syncFromHash();
  }

  t(key: string): string {
    return this.translation.t(key);
  }

  private syncFromHash(): void {
    const h = window.location.hash.replace('#', '');
    if (h) {
      this.activeId.set(h);
    } else {
      this.activeId.set('');
    }
  }
}
