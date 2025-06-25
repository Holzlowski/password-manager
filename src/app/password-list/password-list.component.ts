import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

  siteId !: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Observable<Array<any>>;

  email: string = '';
  username: string = '';
  password: string = '';
  passwordId: string = '';

  formState: string = "Add new";

  constructor(private route: ActivatedRoute, private passwordService: PasswordManagerService) {

    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    })
    this.loadPasswords();
  }

  resetForm() {
    this.formState = "Add new";
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
  }

  onSubmit(values: object) {
    //console.log("Form submitted with values: ", values);
    if (this.formState == "Add new") {
      this.passwordService.addPassword(values, this.siteId)
        .then(() => {
          console.log("Password added successfully!");
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error adding password: ", error);
        })
    } else if (this.formState == "Edit") {
      this.passwordService.updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          console.log("Data updated successfully!");
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error updating data: ", error);
        })
    }
  }

  loadPasswords() {
    this.passwordList = this.passwordService.loadPasswords(this.siteId);
  }

  editPassword(email: string, username: string, password: string, id: string) {
    this.formState = "Edit";
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = id;
  }

  deletePassword(passwordId: string) {
    this.passwordService.deletePassword(this.siteId, passwordId)
      .then(() => {
        console.log("Password deleted successfully!");
        this.resetForm();
      })
      .catch((error) => {
        console.error("Error deleting password: ", error);
      });
  }
}
