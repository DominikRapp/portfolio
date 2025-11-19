import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(private translation: TranslationService) {}

  t(key: string): string {
    return this.translation.t(key);
  }
}
