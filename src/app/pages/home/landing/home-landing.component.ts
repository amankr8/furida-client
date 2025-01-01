import { Component } from '@angular/core';
import { UpdatesComponent } from './components/updates/updates.component';
import { MatDividerModule } from '@angular/material/divider';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPosts } from '../../../state/post/post.actions';
import {
  selectPostLoaded,
  selectPostLoading,
} from '../../../state/post/post.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-landing',
  standalone: true,
  imports: [
    UpdatesComponent,
    MatDividerModule,
    BannerComponent,
    SectionHeaderComponent,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './home-landing.component.html',
  styleUrl: './home-landing.component.scss',
})
export class HomeLandingComponent {
  title: string = 'FURIDA Jamshedpur';
  heading: string = 'LATEST UPDATES';

  postLoaded$: Observable<boolean> = this.store.select(selectPostLoaded);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.postLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadPosts());
    });
  }
}
