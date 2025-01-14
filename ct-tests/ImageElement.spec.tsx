import {expect, test} from '@playwright/experimental-ct-react17';
import ImageElement from '../src/components/ImageElement/ImageElement';

test.describe('Image Element', () => {

  test('should render the image with the correct background image', async ({ mount }) => {
    const imageRef = 'example-image.jpg';
    const onClickButton = () => {};

    const component = await mount(
        <ImageElement id="1" imageRef={imageRef} onClickButton={onClickButton} />
    );

    const imageContainer = component.locator('.ImageContainer');
    // @ts-ignore
    const style = await imageContainer.evaluate((el: HTMLElement)  => el.style.backgroundImage);
    expect(style).toBe(`url(\"/images/example-image.jpg\")`);
  });

  test('should render a button with the correct text when buttonText is provided', async ({ mount }) => {
    const buttonText = 'Click Me';
    const onClickButton = () => {};

    const component = await mount(
        <ImageElement id="2" buttonText={buttonText} imageRef="example.jpg" onClickButton={onClickButton} />
    );

    const button = component.getByTestId("id-image-element-button-2");
    await expect(button).toHaveText(buttonText);
  });

  test('should not render a button when buttonText is not provided', async ({ mount }) => {
    const onClickButton = () => {}; // Empty handler

    const component = await mount(
        <ImageElement id="3" imageRef="example.jpg" onClickButton={onClickButton} />
    );

    const button = component.getByTestId("id-image-element-button-3");
    await expect(button).not.toBeVisible();
  });

  test('should trigger the onClickButton function when button is clicked', async ({ mount }) => {
    const buttonText = 'Click Me';
    let clickTriggered = false;

    const onClickButton = () => {
      console.log();
      clickTriggered = true;
    };

    const component = await mount(
        <ImageElement id="4" buttonText={buttonText} imageRef="example.jpg" onClickButton={onClickButton} />
    );

    const button = component.getByTestId("id-image-element-button-4");

    await button.click();

    expect(clickTriggered).toBeTruthy();
  });

})
