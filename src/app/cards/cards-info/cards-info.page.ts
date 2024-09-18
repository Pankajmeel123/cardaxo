import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EncryptData } from 'src/app/core/encrypt/encrypt-data';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { currencies } from 'src/app/home/currency-data';
import { IBankTransaction } from 'src/app/models/bank-transaction.model';
import { ICardDetails } from 'src/app/models/card.model';
import { ITransactionHyper } from 'src/app/models/transaction-hyper.model';
import { CardService } from 'src/app/services/roynex/card.service';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.page.html',
  styleUrls: ['./cards-info.page.scss'],
})
export class CardsInfoPage implements OnInit {
  protected currencies = currencies;
  public showDetails: number = -1;
  public total: number = 0;
  public isLoading: boolean = true;
  public cardDetails?: ICardDetails;
  public bankTransactions: IBankTransaction[] = [];
  public cardNumber = '';
  public cvv = '';
  public expire = '';
  cardData = {
    cvv: '123',
    card_number: '1001 0224 0000 1101',
    expire: '04/2025',
  };

  transactionData = {
    credit: 2.5,
    debit: 2.5,
    fee: 0,
    description: 'MONTHLY FEE',
    posting_date: '1595497477',
    transaction_date: '1595497477',
    tx_amount: 2.5,
    tx_currency: 'usd',
    tx_id: 54675678678,
    type: 1,
    mc_trade_no: "48d2741747a4493223feb22",
  };
  constructor(private toastController: ToastController, private cardService: CardService, private encryptData: EncryptData) { }

  async ngOnInit() {
    //   await this.getCardDetails();
  }

  toggleDetails(index: number) {
    if (this.showDetails === index) {
      this.showDetails = -1;
    } else {
      this.showDetails = index;
    }
  }

  splitNumber(number: string): string[] {
    const chunks = [];
    for (let i = 0; i < number.length; i += 3) {
      chunks.push(number.substring(i, i + 3));
    }
    return chunks;
  }

  async retry(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    await this.getCardDetails();

  }

  async ionViewWillEnter() {
    await this.getCardDetails();
  }

  async getCardDetails() {
    const response: any = await this.cardService.cardDetails({});
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
    this.cardDetails = response.data;
    if (this.cardDetails != null) {
      this.bankTransactions = [];
      this.cardDetails.transactions?.forEach((element: ITransactionHyper) => {
        if (element && element.bank_tx_list) {
          this.bankTransactions = [...this.bankTransactions, ...element.bank_tx_list];
          console.log(this.bankTransactions);
        }
      });
      if (this.cardDetails.balance && this.cardDetails.balance.available_balance) {
        // this.total = (this.cardDetails.balance.available_balance);
      }

      if (this.cardDetails.encoded_card_detail && this.cardDetails.encoded_card_detail.card_number && this.cardDetails.encoded_card_detail.cvv && this.cardDetails.encoded_card_detail.expire) {
        this.cardNumber = this.cardDetails.encoded_card_detail.card_number;
        this.cvv = this.cardDetails.encoded_card_detail.cvv;
        this.expire = this.cardDetails.encoded_card_detail.expire;
      }

      this.total = 0;

      this.bankTransactions.forEach((element: IBankTransaction) => {
        // Clean up the string value before converting to a number
        const creditValue = parseFloat(element.credit ?? '0');

        // Check if the conversion is successful and not NaN
        if (!isNaN(creditValue) && element.status === 1) {
          console.log(`element ${creditValue}`);
          this.total += creditValue;
        } else {
          console.warn(`Invalid credit value: ${element.credit}`);
        }
      });

      // console.log(`total ${this.total}`);

    }
    this.isLoading = false;
  }





}
