import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { alertController } from '@ionic/vue';          

export class HomePage {     
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(source: Barcode[]) {
    BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
    })
    this.barcodes = source;
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode, BarcodeFormat.Code128, BarcodeFormat.Code39, BarcodeFormat.Code93, BarcodeFormat.Codabar, BarcodeFormat.DataMatrix, BarcodeFormat.Ean13, BarcodeFormat.Ean8, BarcodeFormat.Itf, BarcodeFormat.UpcA, BarcodeFormat.UpcE],
    });
    this.barcodes.push(...barcodes);
    console.log('*******************', barcodes[0].rawValue);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the Barcode and QRCode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}