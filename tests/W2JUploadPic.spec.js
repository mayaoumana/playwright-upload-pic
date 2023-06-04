import { test, expect, chromium } from '@playwright/test';

test('Upload picture', async () => {

  const filePath = '../fixtures/logo.jpg';
  const browser = await chromium.launch({headless : true});
  const context = await browser.newContext();
  const page = await context.newPage();

  //Visit the page
  await page.goto('https://welcometothejungle.com/fr/me/settings/account');
  
  //Declines cookies
  await page.getByRole('button', { name: 'Fermer sans accepter les cookies' }).click();
    
  //Fill mail & password
  await page.fill('[data-testid="login-field-email"]', 'inqom.qaautomationapplicant@gmail.com');
  await page.fill('[data-testid="login-field-password"]', 'o5N,d5ZR@R7^');
  
  //Click on connect
  await page.click('[data-testid="login-button-submit"]');

  //Verify that we are on setting page
  await expect(page).toHaveURL(/settings/);

  //Upload profile picture
  await page.setInputFiles("input[name='avatar']",filePath);
  await page.getByTestId('account-edit-button-submit').click();
  
  //Verify if is update is done 
  await expect(page.getByText('Mise à jour réussie !')).toBeVisible();
  
  await context.close();
  await browser.close();
  });
  