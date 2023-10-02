import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TechnicalService } from './technical.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicalModel } from './technical.model';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css'],
  providers:[TechnicalService]
})

export class TechnicalComponent implements OnInit {

  isNew = false;
  addButton='Add New Requisition'
  dtOptions: any;
  title = 'Requisition Management System';
  dropdownVesselValues=[{ id: '1', name: 'Vessel 1' },{ id: '2', name: 'Vessel 2' },{ id: '3', name: 'Vessel 3' }];
  dropdownProjectValues=[{ id: '1', name: 'Project 1' },{ id: '2', name: 'Project 2' },{ id: '3', name: 'Project 3' }];
  dropdownRequisitionValues=[{ id: '1', name: 'Requisition 1' },{ id: '2', name: 'Requisition 2' },{ id: '3', name: 'Requisition 3' }];
  fakeData:any;
  projectDetail:any;
  isProjectClick!:boolean;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  formValue!: FormGroup;
  technicalModel: TechnicalModel = new TechnicalModel();
  displayStyle = 'none';
  fileUrl: any = '';

  constructor(private technicalService: TechnicalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder)
               {this.createForm();}

  ngOnInit() {
    this.dtOptions = {
      paging: true,
      info: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: '<f<t>ip>',
      destroy: true,
      order: [0, 'asc'],
      searching: true,
      responsive:false
    };
    this.getAllTableData();
    this.getProjectDetail();
  }

  createForm() {
    this.formValue = this.formBuilder.group({
      id:[''],
      item_code:[''],
      description:[''],
      unit:[''],
      quantity:[''],
      price:[''],
      total:[''],
      remark:[''],
      cost:[''],
      selected_supplier:[''],
      supplier_remark: ['']
    });
  }

  clickAddRequision(){
    this.isNew=true;
  }

  getAllTableData(){
    this.technicalService.getAllTableData().subscribe(data=>{
      if(data){
        this.fakeData=data
        this.dtTrigger.next(null);
      }
    })
  }

  getProjectDetail(){
    this.technicalService.getProjectDetail().subscribe(data=>{
      if(data){
        this.projectDetail=data
        this.dtTrigger.next(null);
      }
    })
  }

  updateData(row:TechnicalModel){
    this.isNew=false;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['item_code'].setValue(row.item_code);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['unit'].setValue(row.unit);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['total'].setValue(row.total);
    this.formValue.controls['remark'].setValue(row.remark);
    this.formValue.controls['cost'].setValue(row.cost);
    this.formValue.controls['selected_supplier'].setValue(row.selected_supplier);
    this.formValue.controls['supplier_remark'].setValue(row.supplier_remark);
  }
  
  cancel() {
    this.formValue.reset();
    let ref = document.getElementById('cancel');
    ref?.click();
  }

  onConfirm() {
    this.toastrService.success('Successfully Deleted!');
  }

  onCancel() {
    this.cancel();
  }

  saveChangeDatas(state: number){
    if(state == 1){
      this.toastrService.info('Successfully new item saved!');
      this.cancel();
    }
    else {
      this.toastrService.info(' Item changes successfully !');
      this.cancel();
    }
  }


  openPopup() {
    this.displayStyle = 'block';
  }

  closeOptionPopup() {
    this.displayStyle = 'none';
  }
 

  onSelectFile(e: any) {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
      };
    }
  }

  uploadFile(){
    this.toastrService.success(' File updated successfully !');
    this.closeOptionPopup();
  }

  removeSelectedFile(){
    const inputElement = document.getElementById('file') as HTMLInputElement;
    inputElement.value = '';
  }

}
