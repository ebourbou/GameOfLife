import { Component, OnInit } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { APIService } from '../API.service';
import { User } from '../shared/model/user';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../users/services/users.service';
import { UserUtils } from '../users/utils/user-utils';

@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.scss'] })
export class HomeComponent implements OnInit {
  public slides = [
    { src: '../../../assets/img/weltbild.jpg', text: 'Entwerfe Welten' },
    { src: '../../../assets/img/michelangelo_1.jpg', text: 'Erschaffe Leben' },
    { src: '../../../assets/img/commandments.jpg', text: 'Bestimme die Regeln' },
    {
      src: '../../../assets/img/breeder-animation.gif',
      text: 'Spiel das Spiel des Lebens',
      link: 'game',
      linkLabel: 'Zum Spiel',
    },
  ];

  user: User;

  constructor(private authService: AuthService, private api: APIService, private userService: UserService) {}

  ngOnInit(): void {
    Auth.currentAuthenticatedUser().then(async (cognitoUser) => {
      console.log('Logged in user: ' + cognitoUser.toString());

      this.userService.getUser(cognitoUser.attributes.sub).then((value) => (this.user = UserUtils.fromAws(value)));

      console.log('User loaded:' + JSON.stringify(this.user));
    });
  }
}
