import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogPosts$: Observable<any[]>;
  loading = true;
  error: string | null = null;

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
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
  }

  ngOnInit() {
    // Remove initialization from here since it's now in constructor
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
