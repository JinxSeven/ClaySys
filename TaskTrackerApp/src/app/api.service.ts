import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './interfaces/user';
import { Task } from './interfaces/task';
import { Activity } from './interfaces/activity';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    editMode: boolean = false;
    dataToEdit: any;

    private loggedIn: boolean = false;

    isAuthenticated() { return this.loggedIn; }

    setAuthenticated(state: boolean) { this.loggedIn = state; }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 200) {
            console.error(
                'Backend returned code 200, body was: ',
                JSON.stringify(error.error)
            );
        } else {
            console.error('An error occurred:', error.message);
        }
        return throwError(
            () => new Error('Something went wrong; please try again later.')
        );
    }

    LoggingUser(username: string, password: string): Observable<User> {
        return this.http.get<User>(
            `https://localhost:7042/api/User/GetLoggedUser?username=${username}&password=${password}`
        );
    }

    addNewUser(postData: User): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/User/AddNewUser', postData
        );
    }

    addNewTask(postData: Task): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Task/AddNewTask', postData
        );
    }

    addNewActivity(postData: Activity): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Activity/AddNewActivity', postData
        );
    }

    getUserTasks(userId: string): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Task/GetTasks?userId=${userId}`
        );
    }

    getTaskActivities(taskId: string): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Activity/GetTaskActivities?taskId=${taskId}`
        );
    }

    async updateTaskState(taskId: string, newState: string): Promise<Response> {
        const link = `https://localhost:7042/api/Task/UpdateTaskState?taskId=${taskId}&taskState=${newState}`

        const response = await fetch(link, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    }


    /* Unused API Calls */
    updateTask(postData: Task): Observable<any> {
        return this.http.put<any>(
            'https://localhost:7042/api/Task/Edit', postData
        );
    }

    deleteTask(taskId: string): Observable<any> {
        return this.http.delete<any>(
            `https://localhost:7042/api/Task/Delete?taskId=${taskId}`
        )
    }
}
