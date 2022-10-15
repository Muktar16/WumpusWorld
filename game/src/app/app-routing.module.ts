import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayAgentComponent } from './play-agent/play-agent.component';
import { PlayComponent } from './play-ai/play.component';
import { SettingsComponent } from './settings/settings.component';
import { StartComponent } from './home/start.component';

const routes: Routes = [
  {path: '', component: StartComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'play', component: PlayComponent},
  {path: 'play-agent', component: PlayAgentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
