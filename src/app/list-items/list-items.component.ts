import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '../service/grocery.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent implements OnInit{
  newItem: string = '';
  items: any[] = [];
  listId: string = '';

  constructor(private groceryService: GroceryService, private route: ActivatedRoute) {}

    ngOnInit() {
      this.listId = this.route.snapshot.params['id'];
      this.groceryService.getItems(this.listId).subscribe(data => this.items = data);
   }

   addItem() {
      if(this.newItem) {
        this.groceryService.addItem(this.listId, { name: this.newItem, purchased: false }).subscribe((res: any) => {
          this.groceryService.getItems(this.listId).subscribe(data => this.items = data);
          this.newItem = '';
        });
      }
   }

   updateItem(item: any) {
      this.groceryService.updateItem(this.listId, item._id, item).subscribe();
   }

    deleteItem(id: string) {
      this.groceryService.deleteItem(this.listId, id).subscribe(() => {
        this.groceryService.getItems(this.listId).subscribe(data => this.items = data);
      });
    }
      
}
