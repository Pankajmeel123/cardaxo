import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Clipboard } from '@capacitor/clipboard';
import { AlertController, ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { TransactionService } from 'src/app/services/roynex/transaction.service';

@Component({
  selector: 'app-sending',
  templateUrl: './sending.page.html',
  styleUrls: ['./sending.page.scss'],
})
export class SendingPage implements OnInit {

  public cryptoName = '';
  public fromAddress = '';
  public address = '';
  public amount = '';
  coin_master: any;
  public baseAmount: number = 0;
  public isLoading: boolean = false;
  public scanActive: boolean = false;
  withdraw_fee! : number;
  gas_fee! : number;
  total! : number;
  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController, private transactionService: TransactionService, private alertController: AlertController) { }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParams['name'] == null || this.route.snapshot.queryParams['address'] == null)
      this.router.navigate(['']);
    this.cryptoName = this.route.snapshot.queryParams['name'];
    this.address = this.route.snapshot.queryParams['address'];
    this.baseAmount = this.route.snapshot.queryParams['amount'];
    this.coin_master = this.route.snapshot.queryParams['coin_master'] ? JSON.parse(this.route.snapshot.queryParams['coin_master']): [];
    console.log(this.coin_master)
  }

  ngAfterViewInit() {
    // BarcodeScanner.prepare();
  }

  ngOnDestory() {
    BarcodeScanner.stopScan();
  }

  async pasteText(event: Event) {
    event.preventDefault();
    this.fromAddress = (await Clipboard.read()).value.toString();
    const toast = await this.toastController.create({
      message: 'pasted it',
      duration: 800,
      position: 'top',

    });
    await toast.present();

  }



  async scanText(event: Event) {
    event.preventDefault();

    const allowed = await this.checkPermission();
    if (allowed) {
      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      // BarcodeScanner.hideBackground();

      this.scanActive = true;
      BarcodeScanner.hideBackground(); // make background of WebView transparent
      document.body.classList.add("qrscanner");
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      document.body.classList.remove("qrscanner");
      console.log(result);

      // if the result has content
      if (result.hasContent) {
        this.fromAddress = result.content ?? this.fromAddress;
        this.scanActive = false;
        console.log(result.content); // log the raw scanned content
      }
    }
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [
            {
              text: 'No',
              role: 'cancel'
            },
            {
              text: 'Open Settings',
              handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
              }
            }
          ]
        });
        await alert.present();
      } else {
        resolve(false);
      }
    })
  }

  addressChanage(event: any) {
    this.fromAddress = event.detail.value;
  }

  async amountChanage(event: any) {
    console.log(event.target.value)
    if(parseFloat(event.target.value) < parseFloat(this.coin_master?.min_withdraw_amount)){
      this.amount = '';
      const toast = await this.toastController.create({
        message: `Amount should be greater the ${parseFloat(this.coin_master?.min_withdraw_amount)}`,
        duration: 2500,
        position: 'middle',

      });
      await toast.present();
      return;
    }
    this.amount = event.target.value;
    // this.withdraw_fee = parseFloat(this.coin_master?.withdraw_fee) + parseFloat(this.amount);
    // this.gas_fee = (parseFloat(this.coin_master?.gas_fee)/100) * parseFloat(this.amount);
    this.total = parseFloat(this.amount) + parseFloat(this.coin_master?.withdraw_fee);
  }

  async transfer(event: Event) {
    event.preventDefault();
    if (await this.validateField()) {
      this.isLoading = true;
      const data = {
        'coin': this.cryptoName,
        'from_address': this.fromAddress,
        'amount': this.amount,
        'address': this.address
      };
      const response: any = await this.transactionService.transfer(data);
      if (isFailedResponse(response)) {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: response.message as string ?? '',
          duration: 2500,
          position: 'middle',

        });
        await toast.present();
        return;
      }
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: 'in progress waiting the approval.',
        duration: 1000,
        position: 'bottom',

      });
      await toast.present();
      await toast.onDidDismiss().then(() => {
        this.router.navigate(['/home']);
      });


    }
  }

  async validateField() {
    let message: string = '';

    if (this.amount.toString().length > 0 && Number(this.amount) > this.baseAmount) {
      message = `You can\'t recharge amount bigger than ${this.baseAmount} ${this.cryptoName}`
    }

    if (this.amount.length === 0) {
      message = 'Please, please enter amount';
    }

    if (this.fromAddress.length === 0) {
      message = 'Please, please enter address';
    }

    if (message.length > 0) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2500,
        position: 'bottom',

      });
      await toast.present();
      return false;
    }
    return true;
  }
}
