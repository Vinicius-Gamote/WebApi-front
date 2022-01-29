import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
  // providers: [UserService]
})
export class UsersComponent implements OnInit {

  modalRef?: BsModalRef;
  public users: User[] = []
  public usersFiltered: User[] = []

  public widthImg: Number = 160
  public marginImg: Number = 2
  public heightImg: Number = 110
  public showImg: boolean = false

  private _listFilter: string = ''

  public get listFilter(): string {
    return this._listFilter
  }

  public set listFilter(value: string) {
    this._listFilter = value
    this.usersFiltered = this.listFilter ? this.usersFilter(this.listFilter) : this.users
  }

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getUsers()
  }

  public usersFilter(byFilter: string): User[] {
    byFilter = byFilter.toLocaleLowerCase()
    return this.users.filter(
      (user: any) => user.name.toLocaleLowerCase().indexOf(byFilter) !== -1 ||
      user.position.toLocaleLowerCase().indexOf(byFilter) !== -1 ||
      user.birthday.toLocaleLowerCase().indexOf(byFilter) !== -1
    )
  }

  public alterImage(): void {
    this.showImg = !this.showImg
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (_users: User[]) => {
      this.users = _users
      this.usersFiltered = this.users
    },
    error: (error: any) => {
      this.spinner.hide();
      this.toastr.error('Loading Error!', 'Error!');
    },
    complete: () => this.spinner.hide()
  })
  }

  openModal(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('The user has been deleted!', 'Deleted');
  }

  decline(): void {
    this.modalRef?.hide();
  }
}

