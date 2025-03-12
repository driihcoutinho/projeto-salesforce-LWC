import { LightningElement } from 'lwc';
import createTask from '@salesforce/apex/TaskController.createTask';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TaskForm extends LightningElement {
    taskName = '';
    taskStatus = 'Pendente';
    statusOptions = [
        { label: 'Concluída', value: 'Concluída' },
        { label: 'Pendente', value: 'Pendente' }
    ];

    handleTaskNameChange(event) {
        this.taskName = event.target.value;
    }

    handleStatusChange(event) {
        this.taskStatus = event.detail.value;
    }

    handleSave() {
        createTask({ taskName: this.taskName })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Sucesso',
                        message: 'Tarefa criada com sucesso',
                        variant: 'success'
                    })
                );
                this.resetForm();
                this.dispatchEvent(new CustomEvent('saved'));
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Erro',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    resetForm() {
        this.taskName = '';
        this.taskStatus = 'Pendente';
    }
}
