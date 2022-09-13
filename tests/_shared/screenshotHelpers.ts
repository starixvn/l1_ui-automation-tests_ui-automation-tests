export const imageType = "png";
export const directory = "screenshots/";

export const formatScreenshotFile = (fileName: string) => {
    return `${directory}${fileName}.${imageType}`;
};
