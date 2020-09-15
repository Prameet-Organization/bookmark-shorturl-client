import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtTokenService } from '../../service/jwt-token.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private jwtTokenService: JwtTokenService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const tokenParam = 'token';
      const token = params[ tokenParam ];
      if  (token){
        this.jwtTokenService.setToken(token);
        if (!this.jwtTokenService.isTokenExpired()){
          this.router.navigate(['urls']);
        }
      }
    });
  }

}
