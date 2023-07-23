import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ExplainComponent } from './explain/explain.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'explain', component: ExplainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
