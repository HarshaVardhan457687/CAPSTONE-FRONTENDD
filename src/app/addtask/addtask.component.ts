import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddTaskComponent {
  task = {
    projectName: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  };

  onSubmit() {
    if (this.task.projectName && this.task.projectDescription && this.task.startDate && this.task.endDate) {
      alert('Task created successfully!');
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }
  resetForm() {
    this.task = {
      projectName: '',
      projectDescription: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    };
  } 
  @Output() close = new EventEmitter<void>();

  closeForm() {
    this.close.emit();
  }
}
