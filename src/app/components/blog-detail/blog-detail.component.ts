import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  postId: string | null = null;
  post: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.blogService.getPostById(this.postId).subscribe((post) => {
        this.post = post;
      });
    }
  }
  convertTimestampToDate(timestamp: any): Date {
    return new Date(timestamp.seconds * 1000);
  }

  goBack(): void {
    this.router.navigate(['/blog']);
  }
}
