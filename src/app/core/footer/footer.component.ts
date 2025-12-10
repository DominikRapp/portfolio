import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer-mobile.component.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }

  onFooterLogoClick(event: MouseEvent): void {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
