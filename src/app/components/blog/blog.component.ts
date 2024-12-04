import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogPosts$: Observable<any[]> = this.blogService.getBlogPosts().pipe(
    tap(() => {
      this.loading = false;
      this.error = null;
    }),
    catchError(err => {
      this.loading = false;
      this.error = 'Failed to load blog posts. Please try again later.';
      return of([]);
    })
  );
  loading = true;
  error: string | null = null;

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private scrollAnimationService: ScrollAnimationService
  ) {}

  ngOnInit() {
    this.scrollAnimationService.initScrollAnimations();
    this.loading = true;
    this.blogPosts$ = this.blogService.getBlogPosts().pipe(
      tap(() => {
        this.loading = false;
        this.error = null;
      }),
      catchError(err => {
        this.loading = false;
        this.error = 'Failed to load blog posts. Please try again later.';
        return of([]);
      })
    );
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  convertTimestampToDate(timestamp: any): Date {
    return new Date(timestamp.seconds * 1000);
  }

  viewPost(postId: string | undefined): void {
    if (postId) {
      this.router.navigate(['/blog', postId]);
    } else {
      console.error('Post ID is undefined');
    }
  }
}
