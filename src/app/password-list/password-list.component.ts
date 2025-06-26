import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { CommonModule } from '@angular/common';

import { AES, enc } from 'crypto-js';
import { NavbarComponent } from "../navbar/navbar.component";
import { environment } from '../../enviroment/enviroment';

@Component({
  selector: 'app-password-list',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

  siteId !: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Array<any>;

  email: string = '';
  username: string = '';
  password: string = '';
  passwordId: string = '';

  formState: string = "Add new";

  isSuccess: boolean = false;
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private passwordService: PasswordManagerService) {

    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    })
    this.loadPasswords();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }


  resetForm() {
    this.formState = "Add new";
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
  }

    onSubmit(values: any) {
    // Prüfe, ob eines der Felder leer ist
    if (!values.email || !values.username || !values.password ||
        values.email.trim() === '' || values.username.trim() === '' || values.password.trim() === '') {
      this.showAlert("Bitte alle Felder ausfüllen!");
      return;
    }
  
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword; // Encrypt the password before saving
  
    if (this.formState == "Add new") {
      this.passwordService.addPassword(values, this.siteId)
        .then(() => {
          this.showAlert("Data added successfully!");
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error adding password: ", error);
        })
    } else if (this.formState == "Edit") {
      this.passwordService.updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          this.showAlert("Data updated successfully!");
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error updating data: ", error);
        })
    }
  }

  loadPasswords() {
    this.passwordService.loadPasswords(this.siteId).subscribe(val => {
      this.passwordList = val;
    });
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
        this.showAlert("Password deleted successfully!");
        //this.resetForm();
      })
      .catch((error) => {
        console.error("Error deleting password: ", error);
      });
  }

  encryptPassword(password: string) {
    const secretKey = environment.secretKey;
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = environment.secretKey;
    const decryptedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);;
    return decryptedPassword;
  }

  onDecrypt(password: string, index: number) {
    const decryptedPassword = this.decryptPassword(password);
    this.passwordList[index].password = decryptedPassword; // Update the password in the list with decrypted value
  }
}
