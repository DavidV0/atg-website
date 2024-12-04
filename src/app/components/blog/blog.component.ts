import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, timeout } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogPosts$: Observable<any[]> = of([]);
  loading = true;
  error: string | null = null;
  isBrowser: boolean;

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.blogPosts$ = this.blogService.getBlogPosts().pipe(
        timeout(5000),
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
    } else {
      this.loading = false;
    }
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  convertTimestampToDate(timestamp: any): Date {
    if (!timestamp) return new Date();
    return new Date(timestamp.seconds * 1000);
  }

  viewPost(postId: string | undefined): void {
    if (postId && this.isBrowser) {
      this.router.navigate(['/blog', postId]);
    }
  }
}
