import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly lang = signal<'de' | 'en'>((localStorage.getItem('lang') as 'de' | 'en') || 'de');

  readonly activeId = signal<string>('');

  ngOnInit(): void {
    this.syncFromHash();
  }

  isGerman(): boolean {
    return this.lang() === 'de';
  }

  onLangChange(next: 'de' | 'en'): void {
    this.lang.set(next);
    localStorage.setItem('lang', next);
  }

  onNavClick(id: string): void {
    this.activeId.set(id);
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.syncFromHash();
  }

  private syncFromHash(): void {
    const h = window.location.hash.replace('#', '');
    this.activeId.set(h || 'about');
  }
}
