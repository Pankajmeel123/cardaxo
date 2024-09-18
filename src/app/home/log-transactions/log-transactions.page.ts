import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { ITransactionRoynex } from 'src/app/models/transaction-roynex.model';
import { TransactionService } from 'src/app/services/roynex/transaction.service';

@Component({
  selector: 'app-log-transactions',
  templateUrl: './log-transactions.page.html',
  styleUrls: ['./log-transactions.page.scss'],
})
export class LogTransactionsPage implements OnInit {
  public isLoading: boolean = true;
  public address: string = '';
  public transactionsRoynex?: ITransactionRoynex[];
  public showDetails: number = -1;
  public cryptoName = '';
  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  async ngOnInit() {
    if (this.route.snapshot.queryParams['name'] == null || this.route.snapshot.queryParams['address'] == null)
      this.router.navigate(['']);
    this.address = this.route.snapshot.queryParams['address'];
    this.cryptoName = this.route.snapshot.queryParams['name'];
    await this.getTransaction();
  }

  async getTransaction() {
    const response: any = await this.transactionService.getTransactions(this.address);
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
    this.transactionsRoynex = response.data;
    this.isLoading = false;
  }

  toggleDetails(index: number) {
    if (this.showDetails === index) {
      this.showDetails = -1;
    } else {
      this.showDetails = index;
    }
  }

}
