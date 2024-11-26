import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, QuillModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  blogForm: FormGroup;
  successMessage: string | null = null;
  blogPosts$: Observable<any[]>;

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.blogPosts$ = this.blogService.getBlogPosts();
  }

  postBlog() {
    if (this.blogForm.valid) {
      const blogData = this.blogForm.value;
      const blogCollection = collection(this.firestore, 'blogPosts');
      addDoc(blogCollection, { ...blogData, createdAt: new Date() })
        .then(() => {
          this.successMessage = 'Blog posted successfully!';
          this.blogForm.reset();
        })
        .catch((error) => console.error('Error posting blog:', error));
    }
  }

  deletePost(postId: string) {
    const postDocRef = doc(this.firestore, `blogPosts/${postId}`);
    deleteDoc(postDocRef)
      .then(() => {
        console.log('Post deleted successfully');
      })
      .catch((error) => console.error('Error deleting post:', error));
  }
}
