import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  lang = signal<'de' | 'en'>((localStorage.getItem('lang') as 'de' | 'en') || 'de');

  isGerman(): boolean {
    return this.lang() === 'de';
  }

  onLangChange(next: 'de' | 'en'): void {
    this.lang.set(next);
    localStorage.setItem('lang', next);
  }
}
