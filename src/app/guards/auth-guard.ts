import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { User } from '../services/user';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(User);
  const router = inject(Router);

  if (!authService.isLogged()) {
    const nextPath = router.parseUrl("/");
    return new RedirectCommand(nextPath, { skipLocationChange: true, });
  }
  return true;
};
