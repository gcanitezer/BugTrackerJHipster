import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';
import { TicketComponent } from './ticket.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketUpdateComponent } from './ticket-update.component';
import { ITicket } from 'app/shared/model/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketResolve implements Resolve<ITicket> {
  constructor(private service: TicketService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITicket> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ticket: HttpResponse<Ticket>) => ticket.body));
    }
    return of(new Ticket());
  }
}

export const ticketRoute: Routes = [
  {
    path: '',
    component: TicketComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bugTrackerJHipsterApp.ticket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TicketDetailComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugTrackerJHipsterApp.ticket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TicketUpdateComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugTrackerJHipsterApp.ticket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TicketUpdateComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugTrackerJHipsterApp.ticket.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
