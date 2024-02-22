export function getImageNameFormUrl(imageUrl: string){
    let imageName = ""
    const imageNameMatch = imageUrl.match(/\/([^/]+)_jpg\.rf\.[a-f0-9]+\.jpg/);
    if (imageNameMatch && imageNameMatch[1]) {
        imageName = imageNameMatch[1];
    } 
    return imageName
}