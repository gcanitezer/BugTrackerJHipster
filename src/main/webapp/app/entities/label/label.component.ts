import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from './label.service';
import { LabelDeleteDialogComponent } from './label-delete-dialog.component';

@Component({
  selector: 'jhi-label',
  templateUrl: './label.component.html'
})
export class LabelComponent implements OnInit, OnDestroy {
  labels: ILabel[];
  eventSubscriber: Subscription;

  constructor(protected labelService: LabelService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.labelService.query().subscribe((res: HttpResponse<ILabel[]>) => {
      this.labels = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInLabels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILabel) {
    return item.id;
  }

  registerChangeInLabels() {
    this.eventSubscriber = this.eventManager.subscribe('labelListModification', () => this.loadAll());
  }

  delete(label: ILabel) {
    const modalRef = this.modalService.open(LabelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.label = label;
  }
}
