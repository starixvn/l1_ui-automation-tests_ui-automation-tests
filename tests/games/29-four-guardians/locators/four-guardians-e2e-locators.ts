import { classicSlotLocators } from "../../../core/base-classic-slot-locator";
import { ImageLocator } from "../../../core/base-image-locator";


let ExtFourGuardiansLocators = classicSlotLocators;
ExtFourGuardiansLocators.push(new ImageLocator("james", 0, 0, 0, 0));


export const E2EFourGuardiansLocators = ExtFourGuardiansLocators