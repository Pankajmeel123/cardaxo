import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
// import { Encoding, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor() { }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,

    });
    if (image) {
      console.log(image.path)
      const imageBase64 = await this.readAsBase64(image);
      console.log(imageBase64);
      const imageSizeInBytes = (imageBase64.length * 3) / 4 - 2; // Approximate base64 image size
      const maxSizeInBytes = 24 * 1024 * 1024; // 24MB limit
      if (imageSizeInBytes > maxSizeInBytes) {
        console.error("Image size exceeds the maximum limit.");
        return null;
      }
      return imageBase64;
    }
    return null;
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
