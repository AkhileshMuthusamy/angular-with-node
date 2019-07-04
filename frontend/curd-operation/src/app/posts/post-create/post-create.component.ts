import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output() postCreated = new EventEmitter<Post>();

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) { return; }
    console.log(form.value.title + form.value.content);
    const post: Post = {title: form.value.title, content: form.value.content};
    this.postsService.newPost(post);
    form.resetForm();
  }
}
