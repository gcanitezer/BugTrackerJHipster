import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';

@Component({
  templateUrl: './project-delete-dialog.component.html'
})
export class ProjectDeleteDialogComponent {
  project: IProject;

  constructor(protected projectService: ProjectService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.projectService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'projectListModification',
        content: 'Deleted an project'
      });
      this.activeModal.dismiss(true);
    });
  }
}
