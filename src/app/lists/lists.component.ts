import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroceryService } from '../service/grocery.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {
  newListName: string = '';
  lists: any[] = [];

  constructor(private groceryService: GroceryService, private router: Router) { }

  ngOnInit() {
    this.groceryService.getLists().subscribe(data => this.lists = data);
  }

  createList() {
    if(this.newListName) {
      this.groceryService.createList({ name: this.newListName }).subscribe((res: any) => {
        this.groceryService.getLists().subscribe(data => this.lists = data);
        this.newListName = '';
      });
    }
  }

  viewList(id: string) {
    this.router.navigate(['/lists', id]);
  }

  deleteList(id: string) {
    this.groceryService.deleteList(id).subscribe((res: any) => {
      this.groceryService.getLists().subscribe(data => this.lists = data);
    });
  }

}
