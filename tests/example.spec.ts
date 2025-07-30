import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;


test('TC1 - registro exitoso', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  const emailAleatorio = 'Karina.intriago' + Math.floor(Math.random() * 1000) + '@example.com';

  await page.goto('http://localhost:3000/signup');
  await paginaRegistro.nombreInput.fill('Karina');
  await page.locator('[name="lastName"]').fill('Intriago')
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill(emailAleatorio);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible();
});

test('TC2 - registro no exitoso, mail existente', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  await page.goto('http://localhost:3000/signup');
  await paginaRegistro.nombreInput.fill('Karina');
  await page.locator('[name="lastName"]').fill('Intriago') // manualmente forma css más directa
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('emailAleatorio');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
});


