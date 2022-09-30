import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts = [] as any;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((response) => {
      console.log(response, ' response');
      this.posts = response;
    });
  }

  addPost(inputValue: string) {
    const newPost = {
      title: inputValue,
    };
    inputValue = '';
    this.postService.addPost(newPost).subscribe((response) => {
      console.log(response, ' post response');
      //this.posts.push(response);
      this.posts.splice(0, 0, response);
    });
  }

  updatePost(post: any) {
    this.postService.updatePost(post).subscribe((response) => {
      console.log(response, ' UPDATE response');
    });
  }

  deletePost(post: any) {
    this.postService.deletePost(post).subscribe((response) => {
      console.log(response, ' DELETE response');
      const indexToDel = this.posts.indexOf(post);
      this.posts.splice(indexToDel, 1);
    });
  }
}
