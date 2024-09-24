import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeriffService } from 'src/app/services/veriff.service';
import { PictureService } from 'src/app/services/picture.service';
import { ToastController } from '@ionic/angular';
import { CardService } from 'src/app/services/roynex/card.service';
import { UserService } from 'src/app/services/roynex/user.service';





@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

  selectedIndex: number = 0;
  pageIndex: number = 0;
  isLoading: boolean = false;
  typeDoc: string = 'Passport';
  sequenceFlow: number = -1;
  imageFlow = ['face', 'front', 'back'];
  session: any = null;
  typeOfAction = ['Take a selfie', 'Scan the front of document', 'Scan the back of document', 'Submit the status of document', 'Done']
  documentType = ['PASSPORT', 'DRIVERS_LICENSE', 'ID_CARD'];
  verifications:any = [];
  kycFrom:{
    'user_kyc_id':string | null,
    'face':string | null,
    'front':string | null,
    'back':string | null,
    'dob':string | null,
    'document_number':string | null,
  } = {
    'user_kyc_id':'',
    'face':'',
    'front':'',
    'back':'',
    'dob':'10/10/2000',
    'document_number':'123',
  }

  constructor(
    private router: Router,
    private veriffService: VeriffService,
    private pictureService: PictureService,
    private toastController: ToastController,
    private cardService: CardService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // const response: any = await this.veriffService.getDecision('a49eb2ba-722f-4a7d-96cf-af4c54afa5e6');
    this.getDocType()
  }

  async getDocType(){
    const response: any = await this.cardService.getDocType();
    this.verifications = response.data;
  }




  toggleDoc(index: number, document: any) {
    console.log(index)
    this.selectedIndex = index;
    this.typeDoc = document.name;
    this.addUserKYC(document.id);
  }

  async addUserKYC(kyc_document_type_id:string){
    await this.userService.addUserKYC({kyc_document_type_id:kyc_document_type_id.toString()}).then(res=>{
      this.kycFrom.user_kyc_id = kyc_document_type_id.toString();
    })
    this.nextSecondPage();
  }

  nextSecondPage() {
    this.pageIndex = 1;
    this.initSession(this.documentType[this.selectedIndex]);
  }

  async scan() {
    if (!this.isLoading)
      await this.flowVeriff();
    // this.selectImage();
    // this.veriffService.createSession();
    // this.router.navigate(['/home']);

  }

  async initSession(documentType: string) {
    this.isLoading = true;
    this.session = await this.veriffService.createSession(documentType);
    if (this.session && this.session.status == 'success') {
      this.isLoading = false;
    } else {
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: 'Something wrong, try again',
        duration: 2500,
        position: 'middle',

      });
      await toast.present();

    }

  }

  async flowVeriff() {
    if (this.session && this.session.status == 'success') {
      this.isLoading = true;
      if (this.sequenceFlow >= 2) {
        this.sequenceFlow++;
        this.userService.addUserKycDetail(this.kycFrom).then((res:any)=>{
          console.log(res)
          if (res && res.status == 'OK') {
            this.isLoading = false;
            this.router.navigate(['/cards/application']);
            // this.router.navigate(['/home']);
          } else {
            this.isLoading = false;
          }
        })
      } else {
        this.sequenceFlow++;
        let image = null;
        try {
          image = await this.pictureService.selectImage();
        } catch (error) {
          image = null;
        }
        if (image) {
          if(this.sequenceFlow === 0){
            this.kycFrom.face = image;
          }else if(this.sequenceFlow === 1){
            this.kycFrom.front = image;
          }else{
            this.kycFrom.back = image;
          }
          // const media: any = await this.veriffService.sendPhoto(this.session.verification.id, image, this.imageFlow[this.sequenceFlow]);
          // if (media && media.status == 'success') {
            // if (this.sequenceFlow >= 2) {
            //   this.sequenceFlow++;
            //   const submitSession: any = this.userService.addUserKycDetail(this.kycFrom)
            //   if (submitSession && submitSession.status == 'success') {
            //     // this.router.navigate(['/home']);
            //     this.router.navigate(['/cards/application']);
            //   } else {
            //     this.sequenceFlow--;
            //   }
            // }
            this.isLoading = false;
          // } else {
          //   this.isLoading = false;
          //   this.sequenceFlow--;
          // }
        } else {
          this.isLoading = false;
          this.sequenceFlow--;
        }
      }
    } else {
      await this.initSession(this.documentType[this.selectedIndex]);
    }
  }



}

