import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  docData,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<BlogPost[]> {
    const blogCollection = collection(this.firestore, 'blogPosts');
    return collectionData(blogCollection, { idField: 'id' }) as Observable<
      BlogPost[]
    >;
  }

  getPostById(id: string): Observable<any> {
    const postDocRef = doc(this.firestore, `blogPosts/${id}`);
    return docData(postDocRef);
  }
}
