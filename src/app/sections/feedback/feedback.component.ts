import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/translation.service';

type FeedbackItem = {
  textKey: string;
  authorKey: string;
  roleKey: string;
};

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss', './feedback-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  readonly baseItems: FeedbackItem[] = [
    {
      textKey: 'feedback.item.1.text',
      authorKey: 'feedback.item.1.author',
      roleKey: 'feedback.item.1.role',
    },
    {
      textKey: 'feedback.item.2.text',
      authorKey: 'feedback.item.2.author',
      roleKey: 'feedback.item.2.role',
    },
    {
      textKey: 'feedback.item.3.text',
      authorKey: 'feedback.item.3.author',
      roleKey: 'feedback.item.3.role',
    },
  ];

  readonly items: FeedbackItem[] = [...this.baseItems, ...this.baseItems];

  private skipTransitionIndexes = new Set<number>();
  activeIndex = 0;

  constructor(private translation: TranslationService) { }

  t(key: string): string {
    return this.translation.t(key);
  }

  getCardPosition(index: number): number {
    return this.getPositionFor(index, this.activeIndex);
  }

  private getPositionFor(index: number, active: number): number {
    const length = this.items.length;
    if (!length) {
      return 0;
    }
    const relative = (index - active + length) % length;
    return relative <= 3 ? relative : relative - length;
  }

  private updateSkipTransitions(oldActive: number, newActive: number): void {
    this.skipTransitionIndexes.clear();
    const length = this.items.length;
    for (let i = 0; i < length; i++) {
      const oldPos = this.getPositionFor(i, oldActive);
      const newPos = this.getPositionFor(i, newActive);
      if (Math.abs(newPos - oldPos) > 2) {
        this.skipTransitionIndexes.add(i);
      }
    }
    setTimeout(() => this.skipTransitionIndexes.clear(), 260);
  }

  getSkipTransition(index: number): boolean {
    return this.skipTransitionIndexes.has(index);
  }

  get dots(): number[] {
    return this.baseItems.map((_, index) => index);
  }

  get activeDotIndex(): number {
    if (!this.baseItems.length) {
      return 0;
    }
    return this.activeIndex % this.baseItems.length;
  }

  next(): void {
    if (this.items.length < 2) {
      return;
    }
    const oldActive = this.activeIndex;
    const newActive = (this.activeIndex + 1) % this.items.length;
    this.updateSkipTransitions(oldActive, newActive);
    this.activeIndex = newActive;
  }

  prev(): void {
    if (this.items.length < 2) {
      return;
    }
    const oldActive = this.activeIndex;
    const newActive =
      (this.activeIndex - 1 + this.items.length) % this.items.length;
    this.updateSkipTransitions(oldActive, newActive);
    this.activeIndex = newActive;
  }

  trackByIndex(i: number): number {
    return i;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }
}
