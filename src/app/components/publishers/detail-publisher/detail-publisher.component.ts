import { Component } from '@angular/core';
import { PublisherInterface } from '../publisher.interface';
import { PublisherService } from '../publisher.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-publisher',
  templateUrl: './detail-publisher.component.html'
})
export class DetailPublisherComponent {
  publisher: PublisherInterface = {
    id: 0,
    name: '',
    country: ''
  };

  publisherFound: boolean = true;

  constructor(
    private publisherService: PublisherService,
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
      this.publisherService.get(parseInt(tempId)).subscribe(
        (data) => {
          if(data === null)
            this.publisherFound = false;
          else
            this.publisher = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  goToPublisherEdit(){
    this.router.navigate([`/editoras/${this.publisher.id}/editar`]);
  }
}
