import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';
import { ProjectDeleteDialogComponent } from './project-delete-dialog.component';

@Component({
  selector: 'jhi-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {
  projects: IProject[];
  eventSubscriber: Subscription;

  constructor(protected projectService: ProjectService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.projectService.query().subscribe((res: HttpResponse<IProject[]>) => {
      this.projects = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProjects();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProject) {
    return item.id;
  }

  registerChangeInProjects() {
    this.eventSubscriber = this.eventManager.subscribe('projectListModification', () => this.loadAll());
  }

  delete(project: IProject) {
    const modalRef = this.modalService.open(ProjectDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.project = project;
  }
}
