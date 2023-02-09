import { FourGuardiansLocators } from "./four-guardians-locators";
import { ImageLocator } from "../../../core/base-image-locator";

export const classicLocatorNames = {
    choideName: "choice-name",
};

let E2EFourGuardiansLocators1 = FourGuardiansLocators;
E2EFourGuardiansLocators1.push(new ImageLocator("james", 0, 0, 0, 0));


export const E2EFourGuardiansLocators = E2EFourGuardiansLocators1