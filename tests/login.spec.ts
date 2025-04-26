import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import dotenv from 'dotenv';
import { INVALID_LOGIN_CREDENTIALS, VALID_LOGIN_CREDENTIALS } from '../constants/login';

test.describe('Đăng nhập vào ứng dụng Kotae', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Đăng nhập thất bại với mật khẩu không đúng', async () => {
    await loginPage.login(VALID_LOGIN_CREDENTIALS.VALID_EMAIL, INVALID_LOGIN_CREDENTIALS.INVALID_PASSWORD );
    await loginPage.expectLoginError();
  });

  test('Login success', async () => {
    await loginPage.login(VALID_LOGIN_CREDENTIALS.VALID_EMAIL, VALID_LOGIN_CREDENTIALS.VALID_PASSWORD);
    await loginPage.expectLoginSuccess();
  });
});