import { Routes } from "@angular/router";
import { SingleCreate } from "./single-create/single-create";
import { UserList } from "./user-list/user-list";
import { SearchById } from "./search-by-id/search-by-id";

export const routes: Routes = [
  { path: '', component: UserList },
  { path: 'create-user', component: SingleCreate },
   { path: 'search-by-id', component: SearchById }
 
];
