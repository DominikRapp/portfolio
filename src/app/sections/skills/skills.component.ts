import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  constructor(private translation: TranslationService) {}

  t(key: string): string {
    return this.translation.t(key);
  }
}
