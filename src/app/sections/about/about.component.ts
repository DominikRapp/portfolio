import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }
}
