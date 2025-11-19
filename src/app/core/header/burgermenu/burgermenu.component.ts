import { ChangeDetectionStrategy, Component, HostListener, ElementRef, } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslationService, AppLang } from '../../translation.service';


@Component({
  selector: 'app-burgermenu',
  standalone: true,
  imports: [NgIf, MatButtonToggleModule],
  templateUrl: './burgermenu.component.html',
  styleUrl: './burgermenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgermenuComponent {
  isOpen = false;

  constructor(
    private translation: TranslationService,
    private host: ElementRef<HTMLElement>,
  ) { }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  lang(): AppLang {
    return this.translation.getLang();
  }

  onLangChange(next: AppLang): void {
    this.translation.setLang(next);
  }

  t(key: string): string {
    return this.translation.t(key);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isOpen) {
      return;
    }

    if (window.innerWidth <= 1024) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 1024 && this.isOpen) {
      this.isOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }
}