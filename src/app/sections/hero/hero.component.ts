import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }
}
