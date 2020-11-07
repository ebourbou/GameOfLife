import { Component, OnInit } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { APIService } from '../API.service';
import { Role } from '../shared/model/role';
import { User } from '../shared/model/user';
import { AuthService } from '../core/services/auth.service';

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

  constructor(private authService: AuthService, private api: APIService) {}

  ngOnInit(): void {
    Auth.currentAuthenticatedUser().then(async (u) => {
      // First time login create user in DB
      // User cognito internal id (attributes.sub)

      // Todo move to DAO handling class
      const result = await this.api.GetUser(u.attributes.sub);
      if (!result) {
        this.user = new User();
        this.user.id = u.attributes.sub;
        this.user.username = u.username;
        this.user.role = Role.User; // default to user
        this.user.email = u.attributes.email;
        this.user.lastLogin = new Date().toISOString();
        await this.api.CreateUser({
          id: this.user.id,
          email: this.user.email,
          username: this.user.username,
          role: this.user.role,
          lastLogin: this.user.lastLogin,
        });
      } else {
        this.user = new User();
        this.user.id = result.id;
        this.user.username = result.username;
        this.user.role = Role[result.role];
        this.user.email = result.email;
        this.user.lastLogin = new Date().toISOString();
      }
    });
  }
}
