
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://127.0.0.1:5500/public/index.html')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)

    await driver.sleep(2000)
})
//
// test('Choices shows up when page loads', async () => {
//     await driver.sleep(3000)

//     await driver.findElement(By.id('draw')).click()

//     const choices = await driver.findElement(By.id('choices'))
//     const displayed = await choices.isDisplayed()
//     expect(displayed).toBe(true)

//     await driver.sleep(3000)
// })

test('Choices shows up when page loads', async () => {
await driver.sleep(2000)
    await driver.findElement(By.id('draw')).click()
    const choicesElemnt= await driver.findElement(By.id('choices'))
    const displayed = await choicesElemnt.isDisplayed()
    expect(displayed).toBe(false)
    await driver.sleep(2000)
});