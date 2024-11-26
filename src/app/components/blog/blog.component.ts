import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogPosts$ = this.blogService.getBlogPosts();

  constructor(
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
