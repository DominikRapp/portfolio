import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectOverlayComponent, ProjectData, ProjectPayload, } from './projects-overlays/project-overlay/project-overlay.component';
import { TranslationService } from '../../core/translation.service';

type PreviewPos = 'top' | 'middle' | 'bottom';
type ProjectKey = 'join' | 'epl' | 'daba';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './projects-mobile.component.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  previewSrc: string | null = null;
  previewVisible = false;
  previewPos: PreviewPos = 'top';

  private readonly order: ProjectKey[] = ['join', 'epl', 'daba'];

  private readonly projectsMap: Record<ProjectKey, ProjectData> = {
    join: {
      id: '01',
      title: 'Join',
      descriptionKey: 'projects.join.description',
      image: 'assets/img/join-overlay.jpg',
      techs: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      links: { github: 'https://github.com/DominikRapp/Join', live: 'https://join.dominik-rapp.at' },
    },
    epl: {
      id: '02',
      title: 'El Pollo Loco',
      descriptionKey: 'projects.epl.description',
      image: 'assets/img/epl-overlay.jpg',
      techs: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      links: { github: 'https://github.com/DominikRapp/el-pollo-loco', live: 'https://el-pollo-loco.dominik-rapp.at' },
    },
    daba: {
      id: '03',
      title: 'DABubble',
      descriptionKey: 'projects.daba.description',
      image: 'assets/img/daba-overlay.jpg',
      techs: ['Angular', 'TypeScript', 'Firebase'],
      links: { github: '#', live: '#' },
    },
  };


  constructor(
    private dialog: MatDialog,
    private translation: TranslationService
  ) { }

  t(key: string): string {
    return this.translation.t(key);
  }

  showPreview(src: string, pos: PreviewPos): void {
    this.previewSrc = src;
    this.previewPos = pos;
    this.previewVisible = true;
  }

  hidePreview(): void {
    this.previewVisible = false;
  }

  openProject(key: ProjectKey): void {
    const projects: ProjectData[] = this.order.map(
      projectKey => this.projectsMap[projectKey]
    );
    const startIndex = this.order.indexOf(key);
    const payload: ProjectPayload = { projects, startIndex };

    const ref = this.dialog.open(ProjectOverlayComponent, {
      data: payload,
      ariaLabel: this.t('projects.dialog.aria'),
      autoFocus: true,
      restoreFocus: false,
      maxWidth: '1760px',
      maxHeight: '900px',
      panelClass: 'project-dialog-panel',
    });

    ref.afterClosed().subscribe(() => this.hidePreview());
  }
}
