import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get(this.apiUrl);
  }

  addPost(newPost: any) {
    return this.httpClient.post(this.apiUrl, newPost);
  }

  updatePost(post: any) {
    return this.httpClient.patch(this.apiUrl + '/' + post, {
      ...post,
      read: true,
    });
  }

  deletePost(post: any) {
    return this.httpClient.delete(this.apiUrl + '/' + post);
  }
}
