import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { MeterGroup } from 'primeng/metergroup';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../api.service';
import { TaskStats } from '../interfaces/taskStats';
import { Dialog } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { User } from '../interfaces/user';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { Client } from '../interfaces/client';
import { Project } from '../interfaces/project';
import { Question } from '../interfaces/question';
import { Option } from '../interfaces/option';
import { compliance } from '../interfaces/compliance';
import { Presentation } from '../interfaces/presentation';
import { v4 as uuidv4 } from 'uuid';
import { ComplianceDTO } from '../interfaces/compliance-dto';
import { Select } from 'primeng/select';

@Component({
    standalone: true,
    selector: 'app-admin-dash',
    imports: [
        CommonModule,
        HeaderComponent,
        CardModule,
        MeterGroup,
        Dialog,
        Toast,
        Select,
        StepperModule,
        AccordionModule,
        FormsModule,
        ReactiveFormsModule,
        DividerModule,
        ButtonModule,
    ],
    templateUrl: './admin-dash.component.html',
    styleUrl: './admin-dash.component.css',
    providers: [MessageService],
})
export class AdminDashComponent {
    apiServe = inject(ApiService);
    userTaskStats: TaskStats[] = [];

    clientData: Client[] = [];
    projectsByClient: Project[] = [];

    complianceData: ComplianceDTO[] = [];

    showCreateUser = false;
    showCreateCompliance = false;

    optionCount = [1, 2];
    question: string = '';
    options: string[] = ['', ''];
    correctOptionIndx: number | null = null;

    questions: Question[] = [];

    selectedPresentation: File | null = null;

    complianceForm = new FormGroup({
        complianceTitle: new FormControl(''),
        complianceDesc: new FormControl(''),
        compliancePercent: new FormControl(100),
    });

    loggedUser!: User;

    selectedUserToAssign: any;

    constructor(private messageService: MessageService) {
        this.apiServe.getUserTaskStats().subscribe((taskStats) => {
            this.userTaskStats = taskStats;
            this.addValues();
        });

        // this.userNameList = this.userTaskStats.map(user => user.username);

        this.apiServe.getAllClients().subscribe((clients) => {
            this.clientData = clients;
            this.apiServe
                .getProjectsByClientId(this.clientData[0].id)
                .subscribe((projects) => {
                    this.projectsByClient = projects;
                });
        });


        this.apiServe.getComplianceDetails().subscribe((compliances) => {
            this.complianceData = compliances;
        })

        this.loggedUser = this.getLoggedUser();
    }

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem('LoggedUser');
        return JSON.parse(loggedUser!);
    }

    onFileChange(event: any) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            // List of allowed file types (MIME types for .ppt and .pptx)
            const allowedTypes = [
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            ];

            // Check if the selected file type is allowed
            if (!allowedTypes.includes(file.type)) {
                this.showToast(
                    `error`,
                    `Nope!`,
                    `Please choose a .ppt or .pptx file to continue.`
                );
                event.target.value = ''; // Reset the input field to allow another selection
                this.selectedPresentation = null;
                return; // Reject the file
            }

            // If file is valid, you can process it here
            this.selectedPresentation = file;
            // console.log('File selected:', this.selectedPresentation);
        }
    }

    addOption(count: number) {
        this.optionCount.push(count);
        this.options.push('');
    }

    removeOption() {
        this.optionCount.pop();
        this.options.pop();
    }

    setCorrectOption(index: number) {
        this.correctOptionIndx = index;
    }

    addQuestion() {
        if (this.question.trim() === '') {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Your input is required: Please add a question.`
            );
            return;
        }

        if (this.options.some((option) => option.trim() === '')) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Your input is required: Please add options.`
            );
            return;
        }

        if (this.correctOptionIndx === null) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `The correct option is required to proceed.`
            );
            return;
        }

        const options: Option[] = [];

        for (let index = 0; index < this.options.length; index++) {
            options.push({
                id: uuidv4(),
                optionText: this.options[index],
                isCorrect: this.correctOptionIndx === index ? true : false,
            });
        }

        const question: Question = {
            id: uuidv4(),
            questionText: this.question,
            options: options,
        };

        this.questions.push(question);

        this.question = '';
        this.options = ['', ''];
        this.optionCount = [1, 2];

        console.log(this.questions);
    }

    arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    saveCompliance() {
        if (this.questions.length === 0) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Requires a minimum of 1 question to proceed.`
            );
        }

        const quests = this.questions;
        const formValues = this.complianceForm.value;

        const reader = new FileReader();
        reader.onload = async () => {
            const base64ConFile = this.arrayBufferToBase64(
                reader.result as ArrayBuffer
            );

            const newPresentation: Presentation = {
                id: uuidv4(),
                fileName: this.selectedPresentation!.name,
                fileData: base64ConFile,
            };

            const newCompliance: compliance = {
                id: uuidv4(),
                title: formValues.complianceTitle!,
                description: formValues.complianceDesc!,
                requiredPercentage: formValues.compliancePercent!,
                createdBy: this.loggedUser.username,
                createdDate: new Date(),

                presentation: newPresentation, // ✅ Now properly assigned

                questions: quests,
            };

            console.log(newCompliance); // ✅ Now logs correctly with presentation
            this.apiServe.addNewCompliance(newCompliance).subscribe({
                next: () => {
                    console.log('POST request successful');
                    this.showToast(
                        `success`,
                        `Lets Go!`,
                        `Compliance is ready to empower your team!`
                    );
                    this.showCreateCompliance = false;
                },
            });
        };

        reader.readAsArrayBuffer(this.selectedPresentation!);
        this.questions = [];
    }

    assignCompliance(complianceId: string) {
        if (this.selectedUserToAssign == null) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Please choose someone to assign the compliance to.`
            );
            return;
        }

        /*this.apiServe.assignCompliance(complianceId, this.selectedUserToAssign.id).subscribe({
            next: () => {
                console.log('POST request successful');
                this.showToast(
                    `success`,
                    `Compliance Assigned!`,
                    `Your compliance is now assigned to ${this.selectedUserToAssign.username}!`
                );
                this.showCreateCompliance = false;
            },
        });*/
    }

    getProjectDataByClientId(clientId: string) {
        this.apiServe.getProjectsByClientId(clientId).subscribe((projects) => {
            this.projectsByClient = projects;
        });
        // throw new Error('Method not implemented.');
        // console.log(this.projectsByClient);
    }

    showCreateUserDialog() {
        this.showCreateUser = true;
    }

    showCreateComplianceDialog() {
        this.showCreateCompliance = true;
    }

    addValues() {
        this.userTaskStats.forEach((stat) => {
            stat.username = stat.username
                .split('.')
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
            stat.value = stat.value || []; // Ensure it's initialized
            stat.value.push(
                {
                    label: 'New',
                    color: '#0d6efd',
                    value: stat.newPercentage + 0.05,
                },
                {
                    label: 'Complete',
                    color: '#198754',
                    value: stat.completePercentage + 0.05,
                },
                {
                    label: 'Active',
                    color: '#ffc107',
                    value: stat.activePercentage + 0.05,
                }
            );
        });
    }

    onRegister(registerForm: NgForm) {
        const isUser =
            registerForm.controls['accrole'].value === 'user' ? true : false;
        const postData: User = {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            username: registerForm.controls['usrname'].value,
            email: registerForm.controls['email'].value,
            password: registerForm.controls['pass'].value,
            isAdmin: !isUser,
        };
        console.log(postData);
        this.apiServe.addNewUser(postData).subscribe({
            next: (response) => {
                console.log('POST request successful', response);
                this.showToast(
                    `success`,
                    `Welcome Aboard!`,
                    `The new account is now ready to be used.`
                );
                this.apiServe.getUserTaskStats().subscribe((taskStats) => {
                    this.userTaskStats = taskStats;
                    this.addValues();
                });
            },
            error: (error) => {
                if (
                    error.status === 400 &&
                    error.error.message.includes('UNIQUE constraint')
                ) {
                    console.error('Error: ', error);
                } else {
                    console.error('Error in POST request', error);
                }
                this.showToast(
                    `error`,
                    `Oops!`,
                    `500... The server is experiencing an existential crisis.`
                );
            },
        });

        this.showCreateUser = false;
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: `${severity}`,
            summary: `${summary}`,
            detail: `${detail}`,
            life: 3000,
        });
    }
}
