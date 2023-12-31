import { Component } from '@angular/core';
import { TagInterface } from '../tag.interface';
import { TagsService } from '../tags.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-tag',
  templateUrl: './detail-tag.component.html'
})
export class DetailTagComponent {
  tag: TagInterface = {
    id: 0,
    description: ''
  };

  tagFound: boolean = true;

  constructor(
    private tagService: TagsService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appService.isValid().subscribe(
      () => {},
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
    let tempId = this.route.snapshot.paramMap.get('id');
    if (tempId != null)
      this.tagService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.tagFound = false;
          else
            this.tag = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToTagEdit(){
    this.router.navigate([`/tags/${this.tag.id}/editar`]);
  }

}
