import { LightningElement } from 'lwc';

export default class TaskFilter extends LightningElement {
    selectedStatus = '';
    statusOptions = [
        { label: 'Todas', value: '' },
        { label: 'Concluída', value: 'Concluída' },
        { label: 'Pendente', value: 'Pendente' }
    ];

    handleStatusChange(event) {
        this.selectedStatus = event.detail.value;
        const filterEvent = new CustomEvent('filterchange', {
            detail: { status: this.selectedStatus }
        });
        this.dispatchEvent(filterEvent);
    }
}
