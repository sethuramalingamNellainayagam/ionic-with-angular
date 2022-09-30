import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePicked = new EventEmitter<string | File>();
  @ViewChild('filePicker') getFileInput: ElementRef<HTMLInputElement>;
  selectedImage = '';
  usePicker = false;
  isLoading = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  OnPickImage() {
    if (!Camera) {
      this.getFileInput.nativeElement.click();
      return;
    }
    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Uri,
    })
      .then((image: Photo) => {
        this.selectedImage = image.webPath;
        this.imagePicked.emit(image.webPath);
      })
      .catch((error) => {
        this.getFileInput.nativeElement.click();
        return false;
      });
  }

  onFilePick(event: Event) {
    this.isLoading = true;
    const getImageFile = (event.target as HTMLInputElement).files[0];
    if (!getImageFile) {
      return;
    }

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.isLoading = false;
      this.imagePicked.emit(getImageFile);
    };
    fr.readAsDataURL(getImageFile);
  }
}
