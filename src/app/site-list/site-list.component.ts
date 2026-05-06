import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-site-list',
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {
  allSites !: Observable<Array<any>>;
  siteName: string = '';
  siteURL: string = '';
  siteImgURL: string = '';
  siteId !: string;

  formState: string = "Add new"

  isSuccess: boolean = false;
  successMessage: string = "";

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm() {
    this.formState = 'Add new';
    this.siteName = '';
    this.siteURL = '';
    this.siteImgURL = '';
    this.siteId = '';
  }

  onSubmit(values: any) {
    // Prüfe, ob eines der Felder leer ist
    if (!values.siteName || !values.siteURL || !values.siteImgURL) {
      this.showAlert("Bitte alle Felder ausfüllen!");
      return;
    }

    if (this.formState == "Add new") {
      this.passwordManagerService.addSite(values)
        .then(() => {
          this.showAlert("Site added successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (this.formState == "Edit") {
      this.passwordManagerService.updateSite(this.siteId, values)
        .then(() => {
          this.showAlert("Site updated successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSite();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;

    this.formState = "Edit";
  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id)
      .then(() => {
        this.showAlert("Site deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

