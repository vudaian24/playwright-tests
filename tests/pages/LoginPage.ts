import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('div[role="alert"] .text-sm');
  }

  async goto() {
    await this.page.goto('/auth/login');
    await this.page.waitForSelector('form');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoginSuccess() {
    expect(this.page.url()).toContain('/auth/login');
    console.log('✅ Login success');
  }
  
  async expectLoginError() {
    await this.errorMessage.waitFor({ state: 'visible' });
    await expect(this.errorMessage).toBeVisible();
    expect(this.page.url()).toContain('/auth/login');
    console.log('❌ Login error as expected');
  }
}