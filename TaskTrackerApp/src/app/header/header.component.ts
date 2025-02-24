import { Component, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
    standalone: true,
    selector: 'app-header',
    imports: [
        RouterModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    router = inject(Router);
    apiServe = inject(ApiService);
    logout() {
        this.router.navigate(['/login']);
        // this.apiServe.setAuthenticated(false);
    }
    loggedUser!: User;
    isUser: boolean;

    constructor() {
        this.loggedUser = this.getLoggedUserId();
        this.isUser = this.loggedUser?.password === 'True' ? false : true;
    }

    getLoggedUserId(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }
}
