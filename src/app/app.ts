import { Component, AfterViewInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('portfolio');

  private createCursorShadow(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'cursor-shadow';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    return el;
  }

  private attachCursorShadow(el: HTMLElement): void {
    let rafId = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX + 6}px, ${e.clientY + 6}px)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  ngAfterViewInit(): void {
    const existing = document.querySelector('.cursor-shadow') as HTMLElement | null;
    const node = existing ?? this.createCursorShadow();
    this.attachCursorShadow(node);
  }
}
