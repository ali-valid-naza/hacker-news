import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {

}
