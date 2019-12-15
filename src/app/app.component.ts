import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-src';
  imageFile: any;
  // base64s
  imgBase64: string;
  imageSource = '';
  public picked(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.imageFile = file;
      this.handleInputChange(file); // turn into base64
    } else {
      alert('No file selected');
    }
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);

    this.imgBase64 = base64result;
    this.imageSource = 'data:image/jpeg;base64,' + base64result;

    console.log('base64: ', this.imgBase64);
  }
}
