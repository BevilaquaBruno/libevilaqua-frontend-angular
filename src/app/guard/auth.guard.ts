import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import env from '../../env';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  http.get(`${env.API_URL}/auth/isValid`, {
    headers: new HttpHeaders(
      `Authorization: Bearer ${localStorage.getItem('token')}`
    )
  }).subscribe({
    error: (error) => { if (401 == error.status) router.navigate(['/login']); }
  });

  return true;
};
