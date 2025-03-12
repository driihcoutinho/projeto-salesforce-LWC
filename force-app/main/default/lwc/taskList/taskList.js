import { LightningElement, wire } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';

export default class TaskList extends LightningElement {
    tasks = [];
    filteredTasks = [];
    error;
    selectedStatus = '';

    @wire(getTasks)
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data.map(task => ({
                id: task.Id,
                name: task.Name,
                status: task.Status__c
            }));
            this.filterTasks();
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tasks = [];
            this.filteredTasks = [];
        }
    }

    handleFilterChange(event) {
        this.selectedStatus = event.detail.status;
        this.filterTasks();
    }

    filterTasks() {
        if (this.selectedStatus) {
            this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
        } else {
            this.filteredTasks = [...this.tasks];
        }
    }

    get tasksToDisplay() {
        return this.filteredTasks.length > 0 ? this.filteredTasks : this.tasks;
    }
}
