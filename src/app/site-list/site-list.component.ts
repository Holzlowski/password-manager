import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-site-list',
  imports: [FormsModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  constructor(private passwordManager: PasswordManagerService) { }

onSubmit(values: object){
  console.log('Form submitted with values:', values);
  this.passwordManager.addSite(values)
    .then(() => {
      console.log('Site added successfully');
    })
    .catch((error) => {
      console.log(error);
    });
}

}
